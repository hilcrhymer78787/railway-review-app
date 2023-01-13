import React from "react";
import axios from "axios";

const Fetch = () => {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    const loadData = async () => {
      const result = await axios.get("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json");
      console.log(result);
      setData(result.data);
    };
    loadData();
  }, []);

  if (!data) return <span data-testid="loading">NowLoading</span>;
  return <span data-testid="resolved">{data.greeting}</span>;
}

export default Fetch;