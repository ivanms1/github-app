import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import uniqBy from "lodash/uniqBy";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import getAuthToken from "@/helpers/getAuthToken";

import { setContext } from "@apollo/client/link/context";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token ?? headers?.Authorization}`,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    connectToDevTools: true,
    link: authLink.concat(
      createHttpLink({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
      })
    ),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            search: {
              keyArgs: false,
              merge(existing = null, incoming) {
                if (!existing || !existing?.nodes?.length) {
                  return incoming;
                }

                const existingResults = existing?.nodes ?? [];

                const uniqRepos = uniqBy(
                  [...existingResults, ...incoming.nodes],
                  "__ref"
                );

                return {
                  ...incoming,
                  nodes: [...uniqRepos],
                };
              },
            },
            viewer: {
              keyArgs: false,
              merge(existing = null, incoming) {
                const existingStarredKeyProperty = Object?.keys(
                  existing || {}
                )[3];
                const incomingStarredKeyProperty = Object?.keys(
                  incoming || {}
                )[3];

                if (
                  !existing ||
                  !existing?.[existingStarredKeyProperty].edges?.length
                ) {
                  return incoming;
                }

                const existingResults =
                  existing?.[existingStarredKeyProperty].edges ?? [];

                const uniqRepos = uniqBy(
                  [
                    ...existingResults,
                    ...incoming[incomingStarredKeyProperty].edges,
                  ],
                  "node.__ref"
                );

                return {
                  __typename: incoming.__typename,
                  login: incoming.login,
                  name: incoming.name,
                  [existingStarredKeyProperty]: {
                    ...incoming[incomingStarredKeyProperty],
                    edges: [...uniqRepos],
                  },
                };
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
