import React from "react";

import QUERY_VIEWER from "./QueryViewer.graphql";
import { useQuery } from "@apollo/client";

function Search() {
  const { data } = useQuery(QUERY_VIEWER);

  return <div>{data?.viewer?.login}</div>;
}

export default Search;
