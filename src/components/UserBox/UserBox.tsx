import React from "react";
import { UnstyledButton, Group, Avatar, Text, Box } from "@mantine/core";
import { useSession } from "next-auth/react";

import styles from "./UserBox.module.scss";

function UserBox() {
  const session = useSession();

  return (
    <Box className={styles.UserBox}>
      <UnstyledButton className={styles.Buttons}>
        <Group>
          <Avatar src={session.data?.user?.image} radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {session.data?.user?.name}
            </Text>
            <Text color="dimmed" size="xs">
              {session.data?.user?.email}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
}

export default UserBox;
