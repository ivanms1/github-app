import RepositoryCard from "@/components/RepositoryCard";
import React from "react";
import { Waypoint } from "react-waypoint";
import { useUserStarredRepositoriesQuery } from "src/generated/graphql";

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
      <h1>My starred repositories</h1>
      <div>
        {data?.viewer?.starredRepositories.repositories?.map((repo) => (
          <RepositoryCard key={repo?.node.nameWithOwner} repo={repo?.node!} />
        ))}
        {!loading && data?.viewer?.starredRepositories?.pageInfo?.endCursor && (
          <Waypoint onEnter={onRefetch} bottomOffset="-20%" />
        )}
      </div>
    </div>
  );
}

export default User;
