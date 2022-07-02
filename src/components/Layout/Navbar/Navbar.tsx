import React from "react";
import {
  Text,
  Navbar as MNavbar,
  UnstyledButton,
  Group,
  ThemeIcon,
} from "@mantine/core";
import Link from "next/link";
import { Bookmark, Search } from "tabler-icons-react";

import UserBox from "@/components/UserBox";

import useStore from "src/store/store";

import styles from "./Navbar.module.scss";

const SECTIONS = [
  {
    path: "/search",
    label: "Search",
    icon: Search,
    color: "blue",
  },
  {
    path: "/user",
    label: "Starred",
    icon: Bookmark,
    color: "teal",
  },
];

function Navbar() {
  const open = useStore((state) => state.isNavbarOpen);
  return (
    <MNavbar hiddenBreakpoint="sm" hidden={!open} width={{ sm: 200, lg: 300 }}>
      <MNavbar.Section grow mt="md">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.path} href={section.path}>
              <UnstyledButton className={styles.Link}>
                <Group>
                  <ThemeIcon color={section.color} variant="light">
                    <Icon size={16} />
                  </ThemeIcon>
                  <Text size="sm">{section.label}</Text>
                </Group>
              </UnstyledButton>
            </Link>
          );
        })}
      </MNavbar.Section>
      <MNavbar.Section>
        <UserBox />
      </MNavbar.Section>
    </MNavbar>
  );
}

export default Navbar;
