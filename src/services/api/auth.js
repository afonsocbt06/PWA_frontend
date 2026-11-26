export const login = (data) =>
  fetch("/api/auth/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  }).then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Login failed (${response.status})`);
    }

    return result;
  });
