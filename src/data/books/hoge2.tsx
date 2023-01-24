import React from "react";
import axios, { AxiosResponse } from "axios";
type HeroTeam = {
  squadName: string,
  homeTown: string,
  greeting: string,
  secretBase: string,
  formed: number,
  active: boolean,
  members: Member[]
}
type Member = {
  name: string,
  age: number,
  secretIdentity: string,
  powers: string[]
}
const useHeroes = () => {
  const [data, setData] = React.useState<HeroTeam | null>(null);
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