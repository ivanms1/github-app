import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Waypoint } from "react-waypoint";

import RepositoryCard from "@/components/RepositoryCard";

import { useSearchRepositoriesLazyQuery } from "src/generated/graphql";

const SORT_BY_OPTIONS = [
  { value: "", label: "Best Match" },
  { value: "sort:updated", label: "Recently Updated" },
];

const LANGUAGE_OPTIONS = [
  { value: "", label: "Any Language" },
  { value: "language:javascript", label: "Javascript" },
  { value: "language:python", label: "Python" },
  { value: "language:java", label: "Java" },
  { value: "language:csharp", label: "C#" },
  { value: "language:cpp", label: "C++" },
  { value: "language:c", label: "C" },
  { value: "language:shell", label: "Shell" },
  { value: "language:ruby", label: "Ruby" },
  { value: "language:typescript", label: "TypeScript" },
  { value: "language:go", label: "Go" },
];

type Inputs = {
  query: string;
  sortBy: "sort:updated" | "";
  language: string;
};

function Search() {
  const [search, { data, fetchMore, loading, client }] =
    useSearchRepositoriesLazyQuery();

  const { register, handleSubmit, getValues } = useForm<Inputs>();

  const onRefetch = () => {
    if (!data?.search?.pageInfo?.hasNextPage) {
      return;
    }

    const values = getValues();

    fetchMore({
      variables: {
        after: data?.search?.pageInfo?.endCursor,
        query: `${values?.query} ${values?.sortBy ?? ""} ${
          values?.language ?? ""
        }`.trim(),
      },
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await client.cache.reset();
    search({
      variables: {
        query: `${data?.query} ${data?.sortBy ?? ""} ${
          data?.language ?? ""
        }`.trim(),
      },
    });
  };

  return (
    <div>
      <h1>Search your favorite repos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("query")} type="text" />
        <select {...register("sortBy")}>
          {SORT_BY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select {...register("language")}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
        {!!data?.search?.repositoryCount && (
          <p>{data?.search?.repositoryCount.toLocaleString()} results</p>
        )}
        <div>
          {data?.search?.repositories?.map(
            (repo) =>
              repo?.__typename === "Repository" && (
                <RepositoryCard key={repo.nameWithOwner} repo={repo} />
              )
          )}
          {!loading && data?.search?.pageInfo?.endCursor && (
            <Waypoint onEnter={onRefetch} bottomOffset="-20%" />
          )}
        </div>
      </form>
    </div>
  );
}

export default Search;
