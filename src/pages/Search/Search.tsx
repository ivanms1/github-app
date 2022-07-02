import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Group, Input, NativeSelect, Text } from "@mantine/core";
import { motion } from "framer-motion";
import Head from "next/head";

import RepositoryList from "@/components/RepositoryList";

import { useSearchRepositoriesLazyQuery } from "src/generated/graphql";

import SearchIllustration from "@/assets/icons/searching.svg";
import NoResultsIllustration from "@/assets/icons/no-results.svg";

import styles from "./Search.module.scss";

const ZERO = 0;

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
    useSearchRepositoriesLazyQuery({
      notifyOnNetworkStatusChange: true,
    });

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
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        damping: 12,
        stiffness: 100,
      }}
    >
      <Head>
        <title>Search</title>
      </Head>
      <Text className={styles.Title} weight="bold">
        Search your favorite repos
      </Text>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <Group>
          <Input
            className={styles.SearchInput}
            placeholder="Search..."
            {...register("query")}
            type="text"
          />
          <Button
            className={styles.SearchButton}
            disabled={loading}
            type="submit"
          >
            Search
          </Button>
        </Group>

        <Group>
          <NativeSelect {...register("sortBy")} data={SORT_BY_OPTIONS} />
          <NativeSelect {...register("language")} data={LANGUAGE_OPTIONS} />
        </Group>

        {data?.search?.repositoryCount !== undefined && (
          <Text size="lg">
            {data?.search?.repositoryCount.toLocaleString()} results
          </Text>
        )}

        {data?.search?.repositoryCount === ZERO && (
          <NoResultsIllustration className={styles.SearchSVG} />
        )}

        {!data && !loading && (
          <SearchIllustration className={styles.SearchSVG} />
        )}

        <RepositoryList
          repositories={data?.search?.repositories}
          loading={loading}
          cursor={data?.search?.pageInfo?.endCursor}
          onRefetch={onRefetch}
        />
      </form>
    </motion.div>
  );
}

export default Search;
