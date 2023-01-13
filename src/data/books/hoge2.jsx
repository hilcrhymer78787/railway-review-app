import React from "react";
import axios from "axios";

const useHeroes = () => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const fetch = async () => {
    setErrorText('')
    setIsLoading(true);
    await axios.get("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json")
      .then((res) => {
        setData(res.data);
      }).catch((e) => {
        if (e instanceof Error) {
          setErrorText(e.message)
        } else {
          setErrorText('予期せぬエラー')
        }
      }).finally(() => {
        setIsLoading(false);
      })

  };

  React.useEffect(() => {
    fetch();
  }, []);

  return {
    data,
    isLoading,
    errorText,
    fetch,
  }
}


export default useHeroes;