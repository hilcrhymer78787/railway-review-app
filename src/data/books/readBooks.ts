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
        if (e instanceof Error) {
          setErrorText(e.message)
        } else {
          setErrorText('予期せぬエラー')
        }
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
