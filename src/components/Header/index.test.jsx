import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { UsersContext } from "../../contexts/UsersProvider";
import Header from ".";

describe("Header", () => {
  let countUsers;

  beforeEach(() => {
    countUsers = 0;
  });

  const renderComponent = (component, value = { countUsers }) => (
    <UsersContext.Provider value={value}>
      {component}
    </UsersContext.Provider>
  );

  it("renders correctly the component", () => {
    render(renderComponent(<Header />));

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PWA" })).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  describe("when count of user is more than 0", () => {
    beforeEach(() => {
      countUsers = 1;
    });

    it("renders users count correctly", () => {
      render(renderComponent(<Header />, { countUsers }));

      expect(screen.getByText(`Users: ${countUsers}`)).toBeInTheDocument();
    });
  });
});
