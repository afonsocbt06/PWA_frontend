import { apiFetch } from "./config";

export const login = (data) =>
  apiFetch(data.qrToken ? "/auth/qr-login" : "/auth/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }).then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Login failed (${response.status})`);
    }

    return result;
  });

export const createQrToken = () =>
  apiFetch("/auth/qr-token", {
    headers: { Accept: "application/json" },
    method: "POST",
  }).then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `QR code request failed (${response.status})`);
    }

    return result.qrToken;
  });
