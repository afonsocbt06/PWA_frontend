import { useState } from "react";

export const usePostData = (service) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const addData = async (payload) => {
    setLoading(true);

    return service(payload)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json();
          setData(result);
          alert("Pedido Efetuado com sucesso");
          return result;
        }

        let message = `Request failed with status ${response.status}`;

        try {
          const result = await response.json();
          message = result.message || message;
        } catch {
          // Keep the HTTP status when the API does not return JSON.
        }

        throw new Error(message);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        alert(error.message || "Error");
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    isError,
    isLoading,
    addData,
  };
};
