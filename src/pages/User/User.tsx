import React from "react";
import { Text } from "@mantine/core";

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
    <div>
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
    </div>
  );
}

export default User;
