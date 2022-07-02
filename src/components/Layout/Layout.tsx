import React from "react";
import { AppShell } from "@mantine/core";
import { useSession } from "next-auth/react";

import Navbar from "./Navbar";
import Header from "./Header";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const session = useSession();
  return (
    <AppShell
      classNames={{
        main: styles.Content,
      }}
      navbarOffsetBreakpoint="sm"
      padding="lg"
      fixed
      navbar={session.status === "authenticated" ? <Navbar /> : undefined}
      header={<Header />}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
