import React from "react";

import ReactDOM from "react-dom";

import Search from "../Search";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<Search />, div);

  ReactDOM.unmountComponentAtNode(div);
});

it("checks that search box and search button render correctly", () => {
  const { getByTestId } = render(<Search />);
  expect(getByTestId('search-textbox')).toHaveTextContent("");
  expect(getByTestId('search-button')).toHaveTextContent("Search");
});
