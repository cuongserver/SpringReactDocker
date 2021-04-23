import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import Application from "application";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store";

test("renders learn react link", async () => {
  const history = createMemoryHistory({ initialEntries: ["/login"] });
  render(
    <Provider store={store}>
      <Router history={history}>
        <Application />
      </Router>
    </Provider>
  );
  let loginButton: HTMLElement;

  await waitFor(() => {
    loginButton = screen.getByText("Submit");
  });

  await waitFor(() => {
    fireEvent.click(loginButton);
  });
  expect(screen.getByText("required")).toBeInTheDocument();
  console.log(screen.debug());
});
