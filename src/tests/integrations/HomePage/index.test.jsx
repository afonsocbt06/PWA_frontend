import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import HomePage from "../../../components/HomePage";

vi.mock("../../../components/QrcodeRead", () => ({
  default: () => <div>QrCode</div>,
}));

describe("HomePage", () => {
  const renderComponent = (component) => (
    <MemoryRouter>{component}</MemoryRouter>
  );

  it("renders correctly the component", () => {
    const { container } = render(renderComponent(<HomePage />));

    expect(container).toMatchSnapshot();
  });

  it("renders the login form correctly", () => {
    render(renderComponent(<HomePage />));

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  describe("when click the button Login with Qr Code", () => {
    it("renders the component QrRead", async () => {
      const user = userEvent.setup();
      render(renderComponent(<HomePage />));

      await user.click(screen.getByText("Login with Qr Code"));

      expect(screen.getByText("QrCode")).toBeInTheDocument();
    });
  });
});
