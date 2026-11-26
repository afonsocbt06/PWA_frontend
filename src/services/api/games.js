import { apiFetch } from "./config";

export const getGames = ({ pageSize = 5, current = 1 } = {}) => {
  const query = new URLSearchParams({
    limit: pageSize,
    skip: current - 1,
  });

  return apiFetch(`/games?${query}`, {
    headers: { Accept: "application/json" },
  }).then((response) => response.json());
};

export const createGame = (data) =>
  apiFetch("/games", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
