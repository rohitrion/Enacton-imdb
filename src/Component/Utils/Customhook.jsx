import { useState, useEffect } from 'react';
import axios from 'axios';

const Customhook = (url, _data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData(){
      try {
        if(_data?.results?.length) return
        const response = await axios(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default Customhook;