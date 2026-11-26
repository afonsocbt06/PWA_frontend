const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export function buildApiUrl(path) {
  return apiOrigin ? `${apiOrigin}${path}` : `/api${path}`;
}

export function apiFetch(path, options = {}) {
  return fetch(buildApiUrl(path), { ...options, credentials: "include" });
}

export { apiOrigin };
