import { api } from "../../plugins/axios";
import React from "react";
export type apiBookPostReq = {
  title: string,
  url: string,
  detail: string,
  review: string
}
export type apiBookPostRes = Book[]
export type Book = {
  title: string,
  url: string,
  detail: string,
  review: string
}
export const useCreateBooks = () => {
  const [createBooksLoading, setCreateBooksLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const createBooks = async (apiParam: apiBookPostReq) => {
    setCreateBooksLoading(true);
    setErrorText('');
    await api.post(`/books`, apiParam)
      .catch((e) => {
        const errorMessage = e.message ?? '予期せぬエラー'
        setErrorText(errorMessage)
        throw new Error(errorMessage);
      })
      .finally(() => {
        setCreateBooksLoading(false);
      })
  };
  return {
    createBooksLoading,
    errorText,
    createBooks,
  };
};
