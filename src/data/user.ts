import { useState } from "react";
import { api } from "../plugins/axios";
import { apiUserGetResponseType } from "../types/api/user/get/response";
import { apiUserCreateResponseType } from "../types/api/user/create/response";
import { apiUserCreateRequestType } from "../types/api/user/create/request";
import { apiUserLoginResponseType } from "../types/api/user/login/response";
import { apiUserLoginRequestType } from "../types/api/user/login/request";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { atom } from "recoil";
export const loginInfoAtom = atom<apiUserGetResponseType | null>({
  key: 'loginInfo',
  dangerouslyAllowMutability: true,
  default: null,
})
export const useUserApi = (): {
  getUser: () => Promise<AxiosResponse<apiUserGetResponseType>>;
  getUserLoading: boolean;
  createUser: (params: apiUserCreateRequestType) => Promise<AxiosResponse<apiUserCreateResponseType>>;
  createUserLoading: boolean;
  loginUser: (params: apiUserLoginRequestType) => Promise<AxiosResponse<apiUserLoginResponseType>>;
  loginUserLoading: boolean;
} => {

  // loginUser

  const [loginUserLoading, setLoginUserLoading] = useState<boolean>(false);
  const loginUser = async (
    params: apiUserLoginRequestType
  ): Promise<AxiosResponse<apiUserLoginResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/signin",
      method: "POST",
      data: params
    };
    setLoginUserLoading(true);
    return api(requestConfig)
      .finally(() => {
        setLoginUserLoading(false);
      });
  };

  // createUser

  const [createUserLoading, setCreateUserLoading] = useState<boolean>(false);
  const createUser = async (
    params: apiUserCreateRequestType
  ): Promise<AxiosResponse<apiUserCreateResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/users",
      method: "POST",
      data: params
    };
    setCreateUserLoading(true);
    return api(requestConfig)
      .finally(() => {
        setCreateUserLoading(false);
      });
  };

  // getUser

  const [getUserLoading, setGetUserLoading] = useState<boolean>(false);
  const getUser = async (): Promise<AxiosResponse<apiUserGetResponseType>> => {
    const requestConfig: AxiosRequestConfig = {
      url: "/users",
      method: "GET",
    };
    setGetUserLoading(true);
    return api(requestConfig)
      .finally(() => {
        setGetUserLoading(false);
      });
  };

  return {
    getUser,
    getUserLoading,
    createUser,
    createUserLoading,
    loginUser,
    loginUserLoading,
  };
};
