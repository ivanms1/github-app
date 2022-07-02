import React from "react";
import { Badge, Card, Text, UnstyledButton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { motion } from "framer-motion";

import {
  useAddStarMutation,
  useRemoveStarMutation,
} from "src/generated/graphql";

import timeAgo from "@/helpers/timeAgo";

import Star from "@/assets/icons/star.svg";
import StarFilled from "@/assets/icons/star-filled.svg";

import styles from "./RepositoryCard.module.scss";

export interface RepositoryCardProps {
  repo: {
    id: string;
    name: string;
    nameWithOwner: string;
    description?: string | null;
    updatedAt: string;
    createdAt: string;
    pushedAt?: string | null;
    stargazerCount: number;
    viewerHasStarred: boolean;
    url: string;
    primaryLanguage?: {
      color?: string | null;
      name: string;
      id: string;
    } | null;
  };
}

// @ts-expect-error TODO: fix this ts error
const MotionCard = motion(Card, { forwardMotionProps: true });

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function RepositoryCard({ repo }: RepositoryCardProps) {
  const [star] = useAddStarMutation();
  const [removeStar] = useRemoveStarMutation();

  const updatedTimeDelta =
    Date.now() - (Date.now() - new Date(repo?.pushedAt ?? "").getTime());

  const handleStar = async () => {
    try {
      if (repo.viewerHasStarred) {
        await removeStar({
          variables: {
            input: {
              starrableId: repo.id,
            },
          },
          optimisticResponse: {
            removeStar: {
              starrable: {
                ...repo,
                viewerHasStarred: false,
                stargazerCount: repo.stargazerCount - 1,
              },
            },
          },
        });
      } else {
        await star({
          variables: {
            input: {
              starrableId: repo.id,
            },
          },
          optimisticResponse: {
            addStar: {
              starrable: {
                ...repo,
                viewerHasStarred: true,
                stargazerCount: repo.stargazerCount + 1,
              },
            },
          },
        });
      }
    } catch (error) {
      showNotification({
        color: "red",
        message: String(error),
      });
    }
  };

  return (
    <MotionCard
      className={styles.RepositoryCard}
      shadow="sm"
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.1 },
      }}
      variants={item}
      component={"symbol"}
    >
      <a href={repo.url} target="_blank" rel="noreferrer">
        <Text className={styles.Title} size="lg" weight="bold">
          {repo.nameWithOwner}
        </Text>
      </a>
      <Text size="sm">{repo.description}</Text>
      <div className={styles.InfoBox}>
        {repo?.primaryLanguage?.color && (
          <Badge
            sx={{
              backgroundColor: repo?.primaryLanguage?.color,
              color: "#FFF",
            }}
          >
            {repo.primaryLanguage?.name}
          </Badge>
        )}
        <div className={styles.StarBox}>
          {repo.viewerHasStarred ? (
            <UnstyledButton type="button" onClick={handleStar}>
              <StarFilled />
            </UnstyledButton>
          ) : (
            <UnstyledButton type="button" onClick={handleStar}>
              <Star />
            </UnstyledButton>
          )}{" "}
          <Text size="xs">{repo.stargazerCount}</Text>
        </div>
        {updatedTimeDelta && (
          <Text size="xs">{timeAgo.format(updatedTimeDelta)}</Text>
        )}
      </div>
    </MotionCard>
  );
}

export default RepositoryCard;
