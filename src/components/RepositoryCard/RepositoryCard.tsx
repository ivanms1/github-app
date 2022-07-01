import React from "react";

import timeAgo from "@/helpers/timeAgo";
import {
  useAddStarMutation,
  useRemoveStarMutation,
} from "src/generated/graphql";

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

  const handleStar = () => {
    if (repo.viewerHasStarred) {
      removeStar({
        variables: {
          input: {
            starrableId: repo.id,
          },
        },
      });
    } else {
      star({
        variables: {
          input: {
            starrableId: repo.id,
          },
        },
      });
    }
  };

  return (
    <div>
      <h3>{repo.nameWithOwner}</h3>
      <p>{timeAgo.format(updatedTimeDelta)}</p>
      <p>{repo.primaryLanguage?.name}</p>
      <p>
        {repo.viewerHasStarred ? (
          <button type="button" onClick={handleStar}>
            unstar
          </button>
        ) : (
          <button type="button" onClick={handleStar}>
            star
          </button>
        )}{" "}
        {repo.stargazerCount}
      </p>
    </div>
  );
}

export default RepositoryCard;
