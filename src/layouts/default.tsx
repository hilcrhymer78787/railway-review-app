import React from "react";
import Header from "../components/common/Header";
import Container from "@mui/material/Container";
import { useUserApi, loginInfoAtom } from "../data/user";
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
type Props = {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const { getUser } = useUserApi();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loginInfo) return;
    if (!localStorage.getItem("token")) {
      navigate("/login")
      return;
    }
    const mountedFunc = async () => {
      try {
        const res = await getUser();
        setLoginInfo(res.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          alert(`${e?.response?.status}：${e?.response?.statusText}`);
        } else {
          alert("予期せぬエラー");
        }
        navigate("/login")
      }
    };
    mountedFunc();
  }, []);
  if (!loginInfo) return <></>;
  return (
    <>
      <Header />
      <Container sx={{ p: "70px 10px" }} maxWidth="xs">
        {children}
      </Container>
    </>
  );
}
export default Layout;
