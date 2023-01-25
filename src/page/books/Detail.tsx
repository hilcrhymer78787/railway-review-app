import Layout from "../../layouts/default"
import BookForm from "../../components/Book"
import { useReadBook } from "../../data/books/readBook";
const Detail = () => {
    return (
        <Layout>
            <DetailContent />
        </Layout>
    );
}
const DetailContent = () => {
    const { book, isLoading, errorText } = useReadBook();
    if (isLoading) return <p>ローディング中...</p>
    if (errorText) return <p>{errorText}</p>
    if (!book) return <p>データがありません</p>
    return (<BookForm book={book} />)
}
export default Detail;