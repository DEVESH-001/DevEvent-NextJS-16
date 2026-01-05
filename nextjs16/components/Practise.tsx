import { useEffect, useState } from "react";

const Practise = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("");
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>laoding</p>;
  if (error) return <p>error{error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Practise;
