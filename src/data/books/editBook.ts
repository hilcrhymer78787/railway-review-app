import { api } from "../../plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
export type apiBookPutReq = {
  title: string,
  url: string,
  detail: string,
  review: string
}
export type apiBookPutRes = Book[]
export type Book = {
  title: string,
  url: string,
  detail: string,
  review: string
}
const getBook = async (apiParam: apiBookPutReq, bookId: string) => {
  const requestConfig: AxiosRequestConfig = {
    url: `/books/${bookId}`,
    method: "PUT",
    data: apiParam,
  };
  return api(requestConfig)
};
export const useEditBook = () => {
  const params = useParams();
  const [editBookLoading, setEditBookLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const editBook = async (apiParam: apiBookPutReq) => {
    setEditBookLoading(true);
    try {
      const res = await getBook(apiParam, params.book_id ?? '');
      setErrorText('');
    } catch (e) {
      if (e instanceof Error) {
        setErrorText(e.message)
        throw new Error(e.message)
      } else {
        setErrorText('予期せぬエラー')
        throw new Error('予期せぬエラー')
      }
    } finally {
      setEditBookLoading(false);
    }
  };
  return {
    editBookLoading,
    errorText,
    editBook,
  };
};
