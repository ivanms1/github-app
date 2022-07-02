import React from "react";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";

import RepositoryList from "@/components/RepositoryList";

import {
  SearchRepositoriesQuery,
  useUserStarredRepositoriesQuery,
} from "src/generated/graphql";

import styles from "./User.module.scss";

function User() {
  const { data, loading, fetchMore } = useUserStarredRepositoriesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const onRefetch = () => {
    if (!data?.viewer?.starredRepositories.pageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.viewer.starredRepositories?.pageInfo?.endCursor,
      },
    });
  };

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        damping: 12,
        stiffness: 100,
      }}
    >
      <Text className={styles.Title} weight="bold">
        My starred repositories
      </Text>
      <RepositoryList
        repositories={
          data?.viewer?.starredRepositories.repositories?.map(
            (repo) => repo?.node
          ) as SearchRepositoriesQuery["search"]["repositories"]
        }
        loading={loading}
        cursor={data?.viewer?.starredRepositories?.pageInfo?.endCursor}
        onRefetch={onRefetch}
      />
    </motion.div>
  );
}

export default User;
