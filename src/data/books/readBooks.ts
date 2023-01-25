import { api } from "../../plugins/axios";
import React from "react";
export type apiBookGetReq = {
  offset: number
}
export type apiBookGetRes = Book[]
export type Book = {
  id: string,
  title: string,
  url: string,
  detail: string,
  review: string,
  reviewer: string,
  isMine: true
}
export const useReadBooks = () => {
  const [books, setBooks] = React.useState<apiBookGetRes>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const fetchBooks = async (offset: number) => {
    const apiParam: apiBookGetReq = {
      offset: offset,
    };
    setIsLoading(true);
    setErrorText('');
    await api.get(`/books`, { params: apiParam })
      .then((res) => {
        setBooks(res.data);
        setErrorText('');
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
    const mountedFunc = async () => {
      await fetchBooks(0);
    };
    mountedFunc();
  }, []);
  return {
    books,
    isLoading,
    errorText,
    fetchBooks,
  };
};
