import React from "react";
import { render, screen } from "@testing-library/react";
import ViewLogin from "views/view-login";

test("renders learn react link", () => {
  render(<ViewLogin />);
  const linkElement = screen.getByText(/Login name/i);
  expect(linkElement).toBeInTheDocument();
});
