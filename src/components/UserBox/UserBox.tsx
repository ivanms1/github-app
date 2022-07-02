import React from "react";
import { Group, Avatar, Text, Box, UnstyledButton } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

import styles from "./UserBox.module.scss";

function UserBox() {
  const session = useSession();

  return (
    <Box className={styles.UserBox}>
      <Group>
        <Avatar src={session.data?.user?.image} radius="xl" />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {session.data?.user?.name}
          </Text>
          <Text color="dimmed" size="xs">
            {session.data?.user?.email}
          </Text>
          <UnstyledButton
            type="button"
            className={styles.LogoutButton}
            onClick={() => signOut()}
          >
            Logout
          </UnstyledButton>
        </Box>
      </Group>
    </Box>
  );
}

export default UserBox;
