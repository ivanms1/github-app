import React from "react";
import { signIn } from "next-auth/react";
import { Button, Text } from "@mantine/core";

import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.Home}>
      <Text className={styles.Title}>Welcome to my Github App</Text>
      <Button size="xl" onClick={() => signIn("github")}>
        Sign in
      </Button>
    </div>
  );
}

export default Home;
