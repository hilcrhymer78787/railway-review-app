import { api } from "../../plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
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
const getBooks = async (apiParam: apiBookPostReq) => {
  const requestConfig: AxiosRequestConfig = {
    url: "/books",
    method: "POST",
    data: apiParam,
  };
  return api(requestConfig)
};
export const useCreateBooks = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const createBooks = async (apiParam: apiBookPostReq) => {
    setIsLoading(true);
    try {
      const res = await getBooks(apiParam);
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
  return {
    isLoading,
    errorText,
    createBooks,
  };
};
