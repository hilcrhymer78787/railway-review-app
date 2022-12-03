import React from "react";
import Container from "@mui/material/Container";
import { useUserApi, loginInfoAtom } from "../data/user";
import { useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
type Props = {
  children: React.ReactNode;
}
function LoginLayout({ children }: Props) {
  const { getUser } = useUserApi();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  const navigate = useNavigate();
  React.useEffect(() => {
    const mountedFunc = async () => {
      if (!localStorage.getItem("token")) return
      try {
        const res = await getUser();
        setLoginInfo(res.data);
        navigate("/books")
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.error(`${e?.response?.status}：${e?.response?.statusText}`);
        } else {
          console.error("予期せぬエラー");
        }
      }
    };
    mountedFunc();
  }, []);
  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      {children}
    </Container>
  );
}
export default LoginLayout;
