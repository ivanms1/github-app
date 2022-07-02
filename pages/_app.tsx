import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";

import AuthProvider from "@/components/AuthProvider";
import Layout from "@/components/Layout";

import useApollo from "@/hooks/useApollo";

import "./reset.css";

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = useApollo(pageProps);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <NotificationsProvider position="top-right">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </AuthProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default CustomApp;
