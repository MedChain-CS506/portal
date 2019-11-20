import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PatientFormDialog from "../PatientFormDialog";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <PatientFormDialog />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});