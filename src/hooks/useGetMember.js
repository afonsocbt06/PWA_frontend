import { useCallback, useEffect, useState } from "react";

export const useGetMember = (service, userId) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [member, setMember] = useState({});

  const fetchingData = useCallback(() => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError(false);

    service(userId)
      .then((response) => setMember(response))
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [service, userId]);

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  return {
    member,
    isError,
    isLoading,
    load: fetchingData,
  };
};
