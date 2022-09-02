import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Container,
    Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from 'react-router-dom';
import { useUserApi } from "../../data/user";
import axios from "axios"
import LoginLayout from "../../layouts/login"
const Login = () => {
    const navigate = useNavigate();
    const { loginUser, loginUserLoading, getUser } = useUserApi();
    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");
    const submit = async () => {
        if (validation()) return;
        try {
            const res = await loginUser({
                email: email,
                password: password,
            });
            localStorage.setItem("token", res.data.token);
            navigate("/books")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                alert(`${e?.response?.status}：${e?.response?.statusText}`);
            } else {
                alert("予期せぬエラー");
            }
        }
    };
    const validation = (): boolean => {
        let isError = false;
        setEmailError("");
        setPasswordError("");
        if (!(/.+@.+\..+/.test(email))) {
            setEmailError("正しい形式で入力してください");
            isError = true;
        }
        if (password.length < 8) {
            setPasswordError("パスワードは8桁以上で設定してください");
            isError = true;
        }
        return isError;
    };
    return (
        <LoginLayout>
            <Container sx={{ p: "70px 10px" }} maxWidth="xs">
                <Card>
                    <CardHeader title="ログイン" />
                    <CardContent>
                        <Box sx={{ mb: "15px" }}>
                            <TextField
                                data-cy="email"
                                onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                                error={!!emailError}
                                helperText={emailError}
                                value={email}
                                onChange={(e) => { setEmail(e.currentTarget.value); }}
                                label="email" variant="outlined" color="primary"
                            />
                        </Box>
                        <Box sx={{ mb: "15px" }}>
                            <TextField
                                data-cy="password"
                                onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                                error={!!passwordError}
                                helperText={passwordError}
                                value={password}
                                onChange={(e) => { setPassword(e.currentTarget.value); }}
                                label="password" variant="outlined" color="primary"
                            />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={() => { navigate("/login/signup"); }}
                            color="inherit"
                            variant="contained">
                            新規登録画面へ
                        </Button>
                        <LoadingButton
                            data-cy="submit"
                            color="primary"
                            variant="contained"
                            onClick={() => { submit() }}
                            loading={loginUserLoading}
                        >
                            ログイン<SendIcon />
                        </LoadingButton>
                    </CardActions>
                </Card>
            </Container>
        </LoginLayout>
    );
}
export default Login;