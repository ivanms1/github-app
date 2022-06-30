import React, { useState } from "react";

import RepositoryCard from "@/components/RepositoryCard";

import { useSearchRepositoriesLazyQuery } from "src/generated/graphql";

function Search() {
  const [search, { data }] = useSearchRepositoriesLazyQuery();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search({
      variables: {
        query,
      },
    });
  };

  return (
    <div>
      <h1>Search your favorite repos</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
        />
        <button type="submit">Search</button>
        {data?.search?.repositories?.map(
          (repo) =>
            repo?.__typename === "Repository" && (
              <RepositoryCard key={repo.nameWithOwner} repo={repo} />
            )
        )}
      </form>
    </div>
  );
}

export default Search;
