import React from "react";
import { Loader } from "@mantine/core";
import { Waypoint } from "react-waypoint";
import { motion } from "framer-motion";

import RepositoryCard from "../RepositoryCard";

import { SearchRepositoriesQuery } from "src/generated/graphql";

import styles from "./RepositoryList.module.scss";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

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
      <motion.div
        className={styles.Container}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {repositories?.map(
          (repo) =>
            repo?.__typename === "Repository" && (
              <RepositoryCard key={repo.nameWithOwner} repo={repo} />
            )
        )}
      </motion.div>
      {!loading && cursor && (
        <Waypoint onEnter={onRefetch} bottomOffset="-50%" />
      )}
      {loading && (
        <div className={styles.LoaderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default RepositoryList;
