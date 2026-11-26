import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const authMock = vi.hoisted(() => ({ useAuth: vi.fn() }));

vi.mock("./hooks/useAuth", () => ({
  useAuth: authMock.useAuth,
}));

import ProtectedRoute from "./index";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    authMock.useAuth.mockReturnValue({
      isValidLogin: true,
      isFetching: false,
      hasLogin: vi.fn(),
      role: ["notmember"],
    });
  });

  it.each([
    ["notmember", "User page"],
    ["member", "User page"],
    ["admin", "Home page"],
  ])("handles the %s role on the user route", (role, expectedPage) => {
    authMock.useAuth.mockReturnValue({
      isValidLogin: true,
      isFetching: false,
      hasLogin: vi.fn(),
      role: [role],
    });

    render(
      <MemoryRouter initialEntries={["/user"]}>
        <Routes>
          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRole="user">
                <div>User page</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Home page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(expectedPage)).toBeInTheDocument();
  });
});
