import React from "react";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
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
    Pagination,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Layout from "../../layouts/default"
import { useReadBooks } from "../../data/books/readBooks";
import { apiBookGetRes } from "../../data/books/readBooks"
const Books = () => {
    const { books, errorText, isLoading, fetchBooks } = useReadBooks();
    const [page, setPage] = React.useState(1);
    const onClickPagination = (e: React.ChangeEvent<unknown>, page: number) => {
        window.scroll({ top: 0, behavior: 'smooth' });
        setPage(page)
        fetchBooks((page - 1) * 10)
    }
    return (
        <Layout>
            <Card>
                <CardHeader title="レビュー一覧" />
                <CardContent sx={{ p: 0 }}>
                    <BooksContent books={books} isLoading={isLoading} errorText={errorText} />
                </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <Pagination page={page} onChange={onClickPagination} color='primary' sx={{ mb: '20px' }} count={10} variant="outlined" shape="rounded" />
            </Box>
        </Layout>
    );
}
const BooksContent = (props: {
    books: apiBookGetRes
    isLoading: boolean
    errorText: string
}) => {
    const navigate = useNavigate();
    if (props.isLoading) return <p>ローディング中...</p>
    if (props.errorText) return <p>{props.errorText}</p>
    if (!props.books.length) return <p>データがありません</p>
    return (
        <List sx={{ width: '100%', p: 0 }}>
            {props.books.map((book) => (
                <ListItem key={book.id} sx={{ cursor: 'pointer' }} onClick={() => {
                    navigate(`/books/${book.id}`)
                }}>
                    <ListItemAvatar>
                        <Avatar>
                            <ContentPasteIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={book.title} secondary={`id:${book.id}`} />
                </ListItem>
            ))}
        </List>
    )
}
export default Books;