import React from "react";
import { Waypoint } from "react-waypoint";
import { SearchRepositoriesQuery } from "src/generated/graphql";

import RepositoryCard from "../RepositoryCard";

interface RepositoryListProps {
  repositories: SearchRepositoriesQuery["search"]["repositories"];
  onRefetch: () => void;
  cursor?: string | null | undefined;
  loading: boolean;
}

function RepositoryList({
  repositories,
  onRefetch,
  cursor,
  loading,
}: RepositoryListProps) {
  return (
    <div>
      {repositories?.map(
        (repo) =>
          repo?.__typename === "Repository" && (
            <RepositoryCard key={repo.nameWithOwner} repo={repo} />
          )
      )}
      {!loading && cursor && (
        <Waypoint onEnter={onRefetch} bottomOffset="-20%" />
      )}
    </div>
  );
}

export default RepositoryList;
