import React from "react";
import { Badge, Card, Text, UnstyledButton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

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
    <Card className={styles.RepositoryCard} shadow="sm">
      <a href={repo.url} target="_blank" rel="noreferrer">
        <Text component="p" size="lg" weight="bold">
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
        <Text size="xs">{timeAgo.format(updatedTimeDelta)}</Text>
      </div>
    </Card>
  );
}

export default RepositoryCard;
