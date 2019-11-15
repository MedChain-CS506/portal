import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Landing from "../Landing";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <Landing signedIn={false} />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly with signedIn being false", () => {
  const { getByTestId } = render(
    <Router>
      <Landing signedIn={false} />
    </Router>
  );
  expect(getByTestId("basic-desc")).toHaveTextContent(
    "The simplest decentralized medical-records application"
  );
  expect(getByTestId("github-link")).toBeTruthy();
});

it("renders correctly with signedIn being true", () => {
  const { getByTestId } = render(
    <Router>
      <Landing signedIn={true} />
    </Router>
  );
  expect(getByTestId("new-patient-button")).toHaveTextContent(
    "New Patient Form"
  );
});
