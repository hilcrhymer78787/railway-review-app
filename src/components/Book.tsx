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
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useCreateBooks } from "../data/books/createBooks";
import { useEditBook } from "../data/books/editBook";
import { Book } from '../data/books/readBook'
type Props = {
    book: Book | null | undefined
}
const BookForm = ({ book }: Props) => {
    const navigate = useNavigate();
    const { editBookLoading, editBook } = useEditBook();
    const { createBooksLoading, createBooks } = useCreateBooks();
    const [editable, setEditable] = React.useState<boolean>(!book);
    const [title, setTitle] = React.useState<string>(book ? book.title : "");
    const [titleError, setTitleError] = React.useState<string>("");
    const [detail, setDetail] = React.useState<string>(book ? book.detail : "");
    const [detailError, setDetailError] = React.useState<string>("");
    const [review, setReview] = React.useState<string>(book ? book.review : "");
    const [reviewError, setReviewError] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>(book ? book.url : "");
    const [urlError, setUrlError] = React.useState<string>("");
    const submit = async () => {
        if (validation()) return;
        try {
            if (book) {
                await editBook({
                    title: title,
                    url: url,
                    detail: detail,
                    review: review,
                });
            } else {
                await createBooks({
                    title: title,
                    url: url,
                    detail: detail,
                    review: review,
                });
            }
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
        if (!url) {
            setUrlError("URLを入力してください");
            isError = true;
        }
        return isError;
    };
    return (
        <Card>
            <CardHeader title={!book ? "新規レビュー登録" : editable ? "レビュー編集" : "レビュー詳細"} />
            <CardContent>
                <Box sx={{ my: "15px" }}>
                    {editable &&
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!titleError}
                            helperText={titleError}
                            value={title}
                            onChange={(e) => { setTitle(e.currentTarget.value); }}
                            label="タイトル" variant="outlined" color="primary"
                        />
                    }
                    {!editable && <>
                        <Typography color="primary" >タイトル</Typography>
                        <Typography >{book?.title}</Typography>
                    </>}
                </Box>
                <Box sx={{ mb: "15px" }}>
                    {editable &&
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!urlError}
                            helperText={urlError}
                            value={url}
                            onChange={(e) => { setUrl(e.currentTarget.value); }}
                            label="URL" variant="outlined" color="primary"
                        />
                    }
                    {!editable && <>
                        <Typography color="primary" >URL</Typography>
                        <Typography >{book?.url}</Typography>
                    </>}
                </Box>
                <Box sx={{ mb: "15px" }}>
                    {editable &&

                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!detailError}
                            helperText={detailError}
                            value={detail}
                            onChange={(e) => { setDetail(e.currentTarget.value); }}
                            label="詳細" variant="outlined" color="primary"
                        />
                    }
                    {!editable && <>
                        <Typography color="primary" >詳細</Typography>
                        <Typography >{book?.detail}</Typography>
                    </>}
                </Box>
                <Box sx={{ mb: "15px" }}>
                    {editable &&
                        <TextField
                            onKeyPress={e => { if (e.key === "Enter") { submit() } }}
                            error={!!reviewError}
                            helperText={reviewError}
                            value={review}
                            onChange={(e) => { setReview(e.currentTarget.value); }}
                            label="レビュー" variant="outlined" color="primary"
                        />
                    }
                    {!editable && <>
                        <Typography color="primary" >レビュー</Typography>
                        <Typography >{book?.review}</Typography>
                    </>}
                </Box>
                {!editable &&
                    <>
                        <Box sx={{ mb: "15px" }}>
                            <Typography color="primary" >レビュワー</Typography>
                            <Typography >{book?.reviewer}</Typography>
                        </Box>
                        <Box sx={{ mb: "15px" }}>
                            <Typography color="primary" >isMine</Typography>
                            <Typography >{book?.isMine ? 'true' : 'false'}</Typography>
                        </Box>
                        <Box sx={{ mb: "15px" }}>
                            <Typography color="primary" >ID</Typography>
                            <Typography >{book?.id}</Typography>
                        </Box>
                    </>
                }
            </CardContent>
            <CardActions>
                <Box></Box>
                {!editable &&
                    <Button
                        onClick={() => { setEditable(true); }}
                        color="inherit"
                        variant="contained">
                        編集
                    </Button>
                }
                {editable &&
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={() => { submit() }}
                        loading={createBooksLoading || editBookLoading}
                    >
                        登録<SendIcon />
                    </LoadingButton>
                }
            </CardActions>
        </Card>
    );
}
export default BookForm;