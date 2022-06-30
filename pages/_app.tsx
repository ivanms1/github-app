import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import useApollo from "@/hooks/useApollo";

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default CustomApp;
