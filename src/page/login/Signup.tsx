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
import LoginLayout from "../../layouts/login"
import axios from "axios"
const Signup = () => {
    const navigate = useNavigate();
    const { createUser, createUserLoading } = useUserApi();
    const [name, setName] = React.useState<string>("");
    const [nameError, setNameError] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");
    const submit = async () => {
        if (validation()) return;
        try {
            const res = await createUser({
                name: name,
                email: email,
                password: password,
            });
            localStorage.setItem("token", res.data.token);
            navigate("/books")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error(`${e?.response?.status}：${e?.response?.statusText}`);
            } else {
                console.error("予期せぬエラー");
            }
        }
    };
    const validation = (): boolean => {
        let isError = false;
        setNameError("");
        setEmailError("");
        setPasswordError("");
        if (!name.length) {
            setNameError("名前を入力してください");
            isError = true;
        }
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
                    <CardHeader title="新規登録" />
                    <CardContent>
                        <Box sx={{ mb: "15px" }}>
                            <TextField
                                onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                                error={!!nameError}
                                helperText={nameError}
                                value={name}
                                onChange={(e) => { setName(e.currentTarget.value); }}
                                label="name" variant="outlined" color="primary"
                            />
                        </Box>
                        <Box sx={{ mb: "15px" }}>
                            <TextField
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
                            onClick={() => { navigate("/login"); }}
                            color="inherit"
                            variant="contained">
                            ログイン画面へ
                        </Button>
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            onClick={() => { submit() }}
                            loading={createUserLoading}
                        >
                            登録<SendIcon />
                        </LoadingButton>
                    </CardActions>
                </Card>
            </Container>
        </LoginLayout>
    );
}
export default Signup;