import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { RecoilRoot } from "recoil";
import theme from "../src/plugins/theme";
import Index from "./page"
import Login from "../src/page/login"
import Signup from "./page/login/Signup"
import Books from "./page/books"
import User from "./page/user"
import New from "./page/books/New"
import './App.css';
import React from "react";
import { useUserApi, loginInfoAtom } from "../src/data/user";
import { useSetRecoilState } from "recoil";
import axios from "axios"
type AppInitProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>
}
function AppInit(props: AppInitProps) {
  const { getUser } = useUserApi();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  React.useEffect(() => {
    const mountedFunc = async () => {
      try {
        const res = await getUser();
        setLoginInfo(res.data);
        props.setIsAuth(true);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          alert(`${e?.response?.status}：${e?.response?.statusText}`);
        } else {
          alert("予期せぬエラー");
        }
        props.setIsAuth(false);
      }
    };
    mountedFunc();
  }, []);
  return null;
}
function App() {
  const [isAuth, setIsAuth] = React.useState<boolean | null>(null);
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppInit setIsAuth={setIsAuth} />
        {isAuth !== null &&
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/login/signup" element={<Signup />}></Route>
              <Route path="/books" element={<Books />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/new" element={<New />}></Route>
            </Routes>
          </BrowserRouter>
        }
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
