import { useCallback, useEffect, useState } from "react";

export const useGetData = (service, pageSize = 5, current = 1) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    data: [],
    pagination: {
      current,
      pageSize,
      total: 0,
    },
  });

  const fetchingData = useCallback(() => {
    setLoading(true);
    setError(false);

    return service({ pageSize, current })
      .then((response) => {
        if (response.auth === false) {
          throw new Error("Not authorized to fetch this data");
        }

        setData({
          data: response.data || [],
          pagination: {
            current: response.pagination?.current || current,
            pageSize: response.pagination?.pageSize || pageSize,
            total: response.pagination?.total || 0,
          },
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [service, pageSize, current]);

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  return {
    data,
    isError,
    isLoading,
    load: fetchingData,
  };
};
