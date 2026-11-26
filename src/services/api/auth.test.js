import { beforeEach, describe, expect, it, vi } from "vitest";

const apiMock = vi.hoisted(() => ({ apiFetch: vi.fn() }));

vi.mock("./config", () => ({
  apiFetch: apiMock.apiFetch,
}));

import { createQrToken, login } from "./auth";

describe("QR authentication API", () => {
  beforeEach(() => {
    apiMock.apiFetch.mockReset();
  });

  it("sends QR credentials to the QR login endpoint", async () => {
    apiMock.apiFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ auth: true }),
    });

    await login({ qrToken: "signed-qr-token", expectedRole: "user" });

    expect(apiMock.apiFetch).toHaveBeenCalledWith(
      "/auth/qr-login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          qrToken: "signed-qr-token",
          expectedRole: "user",
        }),
      }),
    );
  });

  it("requests a temporary QR token", async () => {
    apiMock.apiFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ qrToken: "signed-qr-token" }),
    });

    await expect(createQrToken()).resolves.toBe("signed-qr-token");
    expect(apiMock.apiFetch).toHaveBeenCalledWith(
      "/auth/qr-token",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
