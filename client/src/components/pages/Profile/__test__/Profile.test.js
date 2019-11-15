import React from "react";

import ReactDOM from "react-dom";

import Profile from "../Profile";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Profile
      signedIn={true}
      contract={null}
      match={{
        isExact: true,
        params: { id: "age" },
        path: "/profile/:id",
        url: "/profile/age"
      }}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
