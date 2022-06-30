import React from "react";

export interface RepositoryCardProps {
  repo: {
    name: string;
    nameWithOwner: string;
    description?: string | null;
    updatedAt: string;
    createdAt: string;
    stargazerCount: number;
    languages?: {
      edges?: Array<{
        language: {
          color?: string | null;
          name: string;
          id: string;
        };
      } | null> | null;
    } | null;
  };
}

function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <div>
      <h3>{repo.nameWithOwner}</h3>
      {repo.languages?.edges?.map((lang) => (
        <p key={lang?.language.id}>{lang?.language.name}</p>
      ))}
    </div>
  );
}

export default RepositoryCard;
