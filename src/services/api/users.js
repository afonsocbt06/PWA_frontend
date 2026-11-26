import { apiFetch } from "./config";

export const getUsers = ({ pageSize = 5, current = 1 } = {}) => {
  const query = new URLSearchParams({
    limit: pageSize,
    skip: current - 1,
  });

  return apiFetch(`/users?${query}`, {
    headers: { Accept: "application/json" },
  }).then((response) => response.json());
};

export const createUser = (data) =>
  apiFetch("/users", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
