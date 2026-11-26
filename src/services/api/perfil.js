export const getPerfil = () =>
  fetch("/api/users/perfil", {
    headers: { Accept: "application/json" },
  }).then((response) => response.json());
