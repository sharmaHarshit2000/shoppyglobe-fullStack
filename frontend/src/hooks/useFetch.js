import { useEffect } from "react";
import { useState } from "react";

function useFetch(apiUrl) {
  //define loading, error and data as state variable
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ products: [] });

  useEffect(() => {
    async function fetchData() {
      //if get data set in data
      try {
        const res = await fetch(apiUrl);
        const result = await res.json();
        setData(result);
        //if get error set in error
      } catch (err) {
        setError(err.message);
        //after got data or error set loading as false
      } finally {
        setLoading(false);
      }
    }

    fetchData()
    //give depedecy array  as apiUrl if change url run useEffect again
  }, [apiUrl]);

  //return the loading, error, data
  return {loading, error, data}
}


export default useFetch;