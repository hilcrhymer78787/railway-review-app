import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderHook, act } from '@testing-library/react-hooks';
import { useCreateBooks } from './createBooks'
import { api } from './../../plugins/axios'
afterEach(cleanup);

const param = {
  detail: "test",
  review: "stete",
  title: "testffff",
  url: "test",
}
it("fetches and displays data", async () => {
  // 初期レンダリング
  const { result } = renderHook(() =>
    useCreateBooks(),
  );

  // 正常
  await act(async () => {
    jest.spyOn(api, 'post').mockResolvedValue('')
    await result.current.createBooks(param)
  });
  expect(result.current.createBooksLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe(""); //エラーなし

  // エラーテスト
  await act(async () => {
    jest.spyOn(api, 'post').mockRejectedValue(new Error('Async error message'));
    await result.current.createBooks(param)
  });
  expect(result.current.createBooksLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe("Async error message"); //エラーあり

  // 予期せぬエラー
  await act(async () => {
    jest.spyOn(api, 'post').mockRejectedValue("");
    await result.current.createBooks(param)
  });
  expect(result.current.createBooksLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe("予期せぬエラー"); //エラーあり
});