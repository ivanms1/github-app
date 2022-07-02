import React from "react";
import {
  Text,
  Navbar as MNavbar,
  UnstyledButton,
  Group,
  ThemeIcon,
} from "@mantine/core";
import { useRouter } from "next/router";
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
  const handleNavbar = useStore((state) => state.handleNavbar);

  const router = useRouter();
  return (
    <MNavbar hiddenBreakpoint="sm" hidden={!open} width={{ sm: 200, lg: 300 }}>
      <MNavbar.Section grow mt="md">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <UnstyledButton
              key={section.path}
              onClick={() => {
                router.push(section.path);
                if (open) {
                  handleNavbar(false);
                }
              }}
              className={styles.Link}
            >
              <Group>
                <ThemeIcon color={section.color} variant="light">
                  <Icon size={16} />
                </ThemeIcon>
                <Text size="sm">{section.label}</Text>
              </Group>
            </UnstyledButton>
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
