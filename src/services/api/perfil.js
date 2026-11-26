import { apiFetch } from "./config";

export const getPerfil = () =>
  apiFetch("/users/perfil", {
    headers: { Accept: "application/json" },
  }).then((response) => response.json());
