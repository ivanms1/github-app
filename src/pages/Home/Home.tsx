import React from "react";
import { signIn } from "next-auth/react";
import { Button, Text } from "@mantine/core";
import Head from "next/head";

import WelcomeIllustration from "@/assets/icons/welcome.svg";

import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.Home}>
      <Head>
        <title>Github App</title>
      </Head>
      <Text className={styles.Title}>Welcome to my Github App</Text>
      <WelcomeIllustration className={styles.WelcomeSVG} />
      <Button size="xl" onClick={() => signIn("github")}>
        Sign in
      </Button>
    </div>
  );
}

export default Home;
