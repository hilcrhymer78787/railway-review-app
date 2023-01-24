import { api } from "../../plugins/axios";
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
export const useEditBook = () => {
  const params = useParams();
  const [editBookLoading, setEditBookLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const editBook = async (apiParam: apiBookPutReq) => {
    setEditBookLoading(true);
    setErrorText('');
    await api.put(`/books/${params.book_id}`, apiParam)
      .catch((e) => {
        if (e instanceof Error) {
          setErrorText(e.message)
        } else {
          setErrorText('予期せぬエラー')
        }
      })
      .finally(() => {
        setEditBookLoading(false);
      })
  };
  return {
    editBookLoading,
    errorText,
    editBook,
  };
};
