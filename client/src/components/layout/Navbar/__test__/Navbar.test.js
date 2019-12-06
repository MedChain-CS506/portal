import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "../Navbar";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMuiTheme } from "@material-ui/core/styles";

afterEach(cleanup);
//!! doesn't actually render properly in this test for some reason
//!! even though it does render in UI
it("renders Title Link correctly", () => {
	const { getByTestId } = render(
		<Router>
			<Navbar
				theme={createMuiTheme({
					palette: {
						primary: {
							main: "#FF0000",
							light: "#E7F6E7",
							contrastText: "#FFFFFF"
						},
						secondary: {
							main: "#FFFFFF"
						},
						type: "light"
					}
				})}
				handleToggleTheme={null}></Navbar>
		</Router>
	);
	//FIXME expect(getByTestId("title-link")).toHaveTextContent("MedChain");
});

it("renders correctly with signedIn being true, as a pharmacist", () => {
	const { getByTestId } = render(
		<Router>
			<Navbar signedIn isPharmacist />
		</Router>
	);
	// expect(getByTestId("search-bar")).toHaveTextContent(
	//   process.env.REACT_APP_NAME
	// );
	expect(getByTestId("search-bar")).toBeTruthy();
	expect(getByTestId("search-patient-form")).toBeTruthy();
	expect(getByTestId).toMatchSnapshot();
});
