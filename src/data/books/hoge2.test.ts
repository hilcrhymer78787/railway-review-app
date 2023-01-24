import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import { renderHook, act } from '@testing-library/react-hooks';
import useHeroes from './hoge2'
afterEach(cleanup);

jest.mock("axios");

it("fetches and displays data", async () => {
  // 初期レンダリング
  (axios as any).get.mockResolvedValueOnce({ data: { greeting: "hello there" } });
  const { result, waitForNextUpdate } = renderHook(() =>
    useHeroes(),
  );
  expect(result.current.isLoading).toBe(true); //ローディング中
  await waitForNextUpdate();
  expect(result.current.isLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe(""); //エラーなし
  expect(result.current.data?.greeting).toBe("hello there"); //テキストの表示

  // エラーテスト
  await act(async () => {
    (axios as any).get.mockRejectedValue(new Error('Async error message'));
    await result.current.fetch()
  });
  expect(result.current.isLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe("Async error message"); //エラーあり

  // 予期せぬエラー
  await act(async () => {
    (axios as any).get.mockRejectedValue();
    await result.current.fetch()
  });
  expect(result.current.isLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe("予期せぬエラー"); //エラーあり
});