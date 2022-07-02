import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import User from "../User";

import { UserStarredRepositoriesDocument } from "src/generated/graphql";

import data from "__mocks__/user-starred-repositories";

const mocks: any = [
  {
    request: {
      query: UserStarredRepositoriesDocument,
    },
    result: data,
  },
];

describe("User page", () => {
  beforeEach(() => {
    // Reduce animations so snapshots are consistent
    jest.mock("framer-motion", () => ({
      ...jest.requireActual("framer-motion"),
      useReducedMotion: () => true,
    }));

    // stub date, so relative time is consistent
    Date.now = jest.fn(() => new Date(Date.UTC(2017, 7, 9, 8)).valueOf());
  });

  test("it should render the user starred repositories", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <User />
      </MockedProvider>
    );

    // wait for data to load
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(container).toMatchSnapshot();
  });
});
