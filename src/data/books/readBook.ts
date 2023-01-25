import { api } from "../../plugins/axios";
import { useParams } from "react-router-dom";
import React from "react";
export type Book = {
  id: string,
  title: string,
  url: string,
  detail: string,
  review: string,
  reviewer: string,
  isMine: true
}
export const useReadBook = () => {
  const params = useParams();
  const [book, setBook] = React.useState<Book | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const fetchBook = async () => {
    setIsLoading(true);
    setErrorText('');
    await api.get(`/books/${params.book_id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((e) => {
        const errorMessage = e.message ?? '予期せぬエラー'
        setErrorText(errorMessage)
        throw new Error(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };
  React.useEffect(() => {
    fetchBook();
  }, []);
  return {
    book,
    isLoading,
    errorText,
    fetchBook,
  };
};
