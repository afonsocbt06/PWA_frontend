export const getMember = (userId) =>
  fetch(`/api/users/member/${userId}`, {
    headers: { Accept: "application/json" },
  }).then(async (response) => {
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Member lookup failed (${response.status})`);
    }

    return result;
  });

export const createMember = (userId, data) =>
  fetch(`/api/users/${userId}/member`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
