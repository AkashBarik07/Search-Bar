import { useEffect, useState } from "react";

const STATE = {
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  ERROR: "ERROR",
};

export default function TypeAhead() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(STATE.LOADING);
        console.log("Api Call");
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`
        );
        const data = await res.json();
        setResult(data.products);
        setStatus(STATE.SUCCESS);
      } catch (error) {
        setStatus(STATE.ERROR);
      }
    };
    const timerId = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [query]);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === "LOADING" && <div>...Loading</div>}
      {status === "ERROR" && <div>...Error occured</div>}
      {status === "SUCCESS" && (
        <ul>
          {result.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
