import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "./Header";


it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
          <Header />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});