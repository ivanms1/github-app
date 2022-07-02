import React from "react";
import { Loader } from "@mantine/core";
import { Waypoint } from "react-waypoint";
import { SearchRepositoriesQuery } from "src/generated/graphql";

import RepositoryCard from "../RepositoryCard";

import styles from "./RepositoryList.module.scss";

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
    <>
      <div className={styles.Container}>
        {repositories?.map(
          (repo) =>
            repo?.__typename === "Repository" && (
              <RepositoryCard key={repo.nameWithOwner} repo={repo} />
            )
        )}
        {!loading && cursor && (
          <Waypoint onEnter={onRefetch} bottomOffset="-50%" />
        )}
      </div>
      {loading && (
        <div className={styles.LoaderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default RepositoryList;
