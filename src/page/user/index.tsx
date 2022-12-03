import React from "react";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    List,
    TextField,
    CardActions,
    Button,
} from "@mui/material";
import Layout from "../../layouts/default"
import { loginInfoAtom } from "../../data/user";
import { useRecoilState } from "recoil";
import { useUserApi } from "../../data/user";
import axios from "axios"
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
const User = () => {
    const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom)
    const { editUser, editUserLoading } = useUserApi();
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>(loginInfo?.name ?? '');
    const [nameError, setNameError] = React.useState<string>("");
    const submit = async () => {
        if (validation()) return;
        try {
            const res = await editUser({
                name: name,
            });
            setLoginInfo(res.data);
            setEditMode(false)
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
        if (!name.length) {
            setNameError("名前を入力してください");
            isError = true;
        }
        return isError;
    };
    return (
        <Layout>
            <Card>
                <CardHeader title="ユーザー" />
                <CardContent sx={{ p: 0 }}>
                    <List sx={{ width: '100%', p: 0 }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={
                                <>
                                    {editMode &&
                                        <TextField
                                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                                            error={!!nameError}
                                            helperText={nameError}
                                            value={name}
                                            onChange={(e) => { setName(e.currentTarget.value); }}
                                            label="name" variant="outlined" color="primary"
                                        />
                                    }
                                    {!editMode && name}
                                </>

                            } />
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Box></Box>
                    {editMode &&
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            onClick={() => { submit() }}
                            loading={editUserLoading}
                        >
                            登録<SendIcon />
                        </LoadingButton>}
                    {!editMode &&
                        <Button
                            onClick={() => { setEditMode(true); }}
                            color="inherit"
                            variant="contained">編集
                        </Button>
                    }
                </CardActions>
            </Card>
        </Layout>
    );
}
export default User;