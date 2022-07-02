import React from "react";
import { Burger, Header as MHeader, MediaQuery, Text } from "@mantine/core";

import useStore from "src/store/store";

import LunitLogo from "@/assets/icons/lunit.svg";

import styles from "./Header.module.scss";

function Header() {
  const open = useStore((state) => state.isNavbarOpen);
  const handleNavbar = useStore((state) => state.handleNavbar);
  return (
    <MHeader height={60} p="md">
      <div className={styles.Header}>
        {/* inline styles required by the library */}
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={open}
            onClick={() => handleNavbar(!open)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <LunitLogo className={styles.Logo} />
        <Text>Github App</Text>
      </div>
    </MHeader>
  );
}

export default Header;
