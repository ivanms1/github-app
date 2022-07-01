import React from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";

import RepositoryCard from "@/components/RepositoryCard";
import RepositoryList from "@/components/RepositoryList";

import {
  SearchRepositoriesQuery,
  useUserStarredRepositoriesQuery,
} from "src/generated/graphql";

function User() {
  const { data, loading, fetchMore } = useUserStarredRepositoriesQuery();

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
      <Link href={"/search"}>User</Link>
      <h1>My starred repositories</h1>
      <div>
        {data?.viewer?.starredRepositories.repositories?.map((repo) => (
          <RepositoryCard key={repo?.node.nameWithOwner} repo={repo?.node!} />
        ))}
        {!loading && data?.viewer?.starredRepositories?.pageInfo?.endCursor && (
          <Waypoint onEnter={onRefetch} bottomOffset="-20%" />
        )}
      </div>
      <RepositoryList
        repositories={
          data?.viewer?.starredRepositories
            .repositories as SearchRepositoriesQuery["search"]["repositories"]
        }
        loading={loading}
        cursor={data?.viewer?.starredRepositories?.pageInfo?.endCursor}
        onRefetch={onRefetch}
      />
    </div>
  );
}

export default User;
