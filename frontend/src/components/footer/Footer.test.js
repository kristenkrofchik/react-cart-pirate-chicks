import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

it("matches snapshot", function () {
    const { asFragment } = render(
        <Footer />
    );
    expect(asFragment()).toMatchSnapshot();
  });