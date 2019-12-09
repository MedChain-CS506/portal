import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PatientFormDialog from "../PatientFormDialog";
import { ExpansionPanelActions } from "@material-ui/core";

afterEach(cleanup);
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Router>
      <PatientFormDialog dialogProps={{ PatientFormDialog: false }} />
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

// it("renders Title Link correctly", () => {
//   const { getByTestId } = render(
//     <Router>
//       <PatientFormDialog dialogProps={{ PatientFormDialog: false }} />
//     </Router>
//   );

//   expect(getByTestId("dialog-title")).toBeTruthy();
// });
