import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loader } from "@mantine/core";

import styles from "./AuthProvider.module.scss";

const PRIVATE_ROUTES = ["/user", "/search"];

interface AuthProvider {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProvider) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" &&
      PRIVATE_ROUTES.includes(router.pathname)
    ) {
      router.replace("/");
    }

    if (
      status === "authenticated" &&
      !PRIVATE_ROUTES.includes(router.pathname)
    ) {
      router.replace("/search");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className={styles.LoaderContainer}>
        <Loader size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthProvider;
