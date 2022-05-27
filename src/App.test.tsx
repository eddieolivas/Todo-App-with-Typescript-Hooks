import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Eddie", () => {
  render(<App />);
  const linkElement = screen.getByText(/Eddie/i);
  expect(linkElement).toBeInTheDocument();
});
