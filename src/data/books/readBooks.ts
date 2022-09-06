import { api } from "../../plugins/axios";
import { AxiosRequestConfig } from "axios";
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
const getBooks = async (offset: number) => {
  const apiParam: apiBookGetReq = {
    offset: offset,
  };
  const requestConfig: AxiosRequestConfig = {
    url: "/books",
    method: "GET",
    params: apiParam,
  };
  return api(requestConfig)
};
export const useReadBooks = () => {
  const [books, setBooks] = React.useState<apiBookGetRes>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const fetchBooks = async (offset: number) => {
    setIsLoading(true);
    try {
      const res = await getBooks(offset);
      setBooks(res.data);
      setErrorText('');
    } catch (e) {
      if (e instanceof Error) {
        setErrorText(e.message)
      } else {
        setErrorText('予期せぬエラー')
      }
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchBooks(0);
  }, []);
  return {
    books,
    isLoading,
    errorText,
    fetchBooks,
  };
};
