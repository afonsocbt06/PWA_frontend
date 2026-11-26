export const getUsers = ({ pageSize = 5, current = 1 } = {}) => {
  const query = new URLSearchParams({
    limit: pageSize,
    skip: current - 1,
  });

  return fetch(`/api/users?${query}`, {
    headers: { Accept: "application/json" },
  }).then((response) => response.json());
};

export const createUser = (data) =>
  fetch("/api/users", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
