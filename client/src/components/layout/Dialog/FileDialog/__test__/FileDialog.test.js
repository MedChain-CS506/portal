import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import FileDialog from "../FileDialog";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);
it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<Router>
			<FileDialog dialogProps={null} />
		</Router>,
		div
	);

	ReactDOM.unmountComponentAtNode(div);
});
