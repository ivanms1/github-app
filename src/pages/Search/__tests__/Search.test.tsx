import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

import Search from "../Search";

import { SearchRepositoriesDocument } from "src/generated/graphql";

import data, { searchDataPageTwo } from "__mocks__/search-repositories";

import "@testing-library/jest-dom/extend-expect";

const mocks: any = [
  {
    request: {
      query: SearchRepositoriesDocument,
      variables: { query: "localize" },
    },
    result: {
      data,
    },
  },
  {
    request: {
      query: SearchRepositoriesDocument,
      variables: { query: "localize", after: "Y3Vyc29yOjEy" },
    },
    result: {
      data: searchDataPageTwo,
    },
  },
];

describe("Search page", () => {
  beforeEach(() => {
    // Reduce animations so snapshots are consistent
    jest.mock("framer-motion", () => ({
      ...jest.requireActual("framer-motion"),
      useReducedMotion: () => true,
    }));

    // stub date, so relative time is consistent
    Date.now = jest.fn(() => new Date(Date.UTC(2017, 7, 9, 8)).valueOf());
  });

  test("it should search and render results", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Search />
      </MockedProvider>
    );

    fireEvent.input(screen.getByPlaceholderText("Search..."), {
      target: {
        value: "localize",
      },
    });

    userEvent.click(screen.getByText("Search"));

    await new Promise((resolve) => setTimeout(resolve, 2500));

    expect(container).toMatchSnapshot();
  });
});
