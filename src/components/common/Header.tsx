import {
  Avatar,
  Container,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Button
} from "@mui/material";
import { loginInfoAtom } from "../../data/user";
import { useTheme } from '@mui/material/styles';
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const theme = useTheme();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton sx={{ pr: 1 }}>
            <Avatar
              src={""}
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                width: "40px",
                height: "40px",
              }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{loginInfo?.name}さん</Typography>
          <Button
            onClick={() => {
              if (!window.confirm("ログアウトしますか？")) return;
              localStorage.removeItem("token");
              setLoginInfo(null);
              navigate("/login");
            }}
          >ログアウト</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
