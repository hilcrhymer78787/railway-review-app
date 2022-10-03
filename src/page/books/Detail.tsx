import Layout from "../../layouts/default"
import BookForm from "../../components/Book"
import { useReadBook } from "../../data/books/readBook";
const Detail = () => {
    const { book, fetchBook } = useReadBook();
    if (!book) return null
    return (
        <Layout>
            <BookForm book={book} />
        </Layout>
    );
}
export default Detail;