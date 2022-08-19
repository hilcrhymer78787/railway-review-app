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
import Layout from "../../layouts/default"
const Books = () => {
    const navigate = useNavigate();
    const { loginUser, loginUserLoading } = useUserApi();
    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");
    const submit = () => {
        if (validation()) return;
        loginUser({
            email: email,
            password: password,
        });
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
        <Layout>
            <Card>
                <CardHeader title="メイン画面" />
                <CardContent>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</CardContent>
            </Card>
        </Layout>
    );
}
export default Books;