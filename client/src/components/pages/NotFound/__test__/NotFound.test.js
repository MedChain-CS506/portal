import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import NotFound from "../NotFound";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <NotFound />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <Router>
      <NotFound />
    </Router>
  );
  expect(getByTestId("error-message")).toHaveTextContent("Content Not Found");
  expect(getByTestId("error-desc")).toHaveTextContent("The requested URL was not found on this server");
  expect(getByTestId("home-button")).toBeTruthy();
});
