import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Layout from "../../layouts/default"
import { useCreateBooks } from "../../data/createBooks";
const New = () => {
    const navigate = useNavigate();
    const { isLoading, errorText, createBooks } = useCreateBooks();
    const [title, setTitle] = React.useState<string>("");
    const [titleError, setTitleError] = React.useState<string>("");
    const [detail, setDetail] = React.useState<string>("");
    const [detailError, setDetailError] = React.useState<string>("");
    const [review, setReview] = React.useState<string>("");
    const [reviewError, setReviewError] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");
    const [urlError, setUrlError] = React.useState<string>("");
    const submit = async () => {
        if (validation()) return;
        try {
            await createBooks({
                title: title,
                url: url,
                detail: detail,
                review: review,
            });
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
        setTitleError("");
        setUrlError("");
        setDetailError("");
        setReviewError("");
        if (!title) {
            setTitleError("タイトルを入力してください");
            isError = true;
        }
        if (!detail) {
            setDetailError("詳細を入力してください");
            isError = true;
        }
        if (!review) {
            setReviewError("レビューを入力してください");
            isError = true;
        }
        if (!review) {
            setUrlError("URLを入力してください");
            isError = true;
        }
        return isError;
    };
    return (
        <Layout>
            <Card>
                <CardHeader title="新規レビュー登録" />
                <CardContent>
                    <Box sx={{ mb: "15px" }}>
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!titleError}
                            helperText={titleError}
                            value={title}
                            onChange={(e) => { setTitle(e.currentTarget.value); }}
                            label="タイトル" variant="outlined" color="primary"
                        />
                    </Box>
                    <Box sx={{ mb: "15px" }}>
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!urlError}
                            helperText={urlError}
                            value={url}
                            onChange={(e) => { setUrl(e.currentTarget.value); }}
                            label="url" variant="outlined" color="primary"
                        />
                    </Box>
                    <Box sx={{ mb: "15px" }}>
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!detailError}
                            helperText={detailError}
                            value={detail}
                            onChange={(e) => { setDetail(e.currentTarget.value); }}
                            label="詳細" variant="outlined" color="primary"
                        />
                    </Box>
                    <Box sx={{ mb: "15px" }}>
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!reviewError}
                            helperText={reviewError}
                            value={review}
                            onChange={(e) => { setReview(e.currentTarget.value); }}
                            label="レビュー" variant="outlined" color="primary"
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box></Box>
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={() => { submit() }}
                        loading={isLoading}
                    >
                        登録<SendIcon />
                    </LoadingButton>
                </CardActions>
            </Card>
        </Layout>
    );
}
export default New;