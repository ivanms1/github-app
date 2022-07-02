import { render } from "@testing-library/react";

import Home from "../Home";

test("it should render the home page", () => {
  const { container } = render(<Home />);

  expect(container).toMatchSnapshot();
});
