import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderHook, act } from '@testing-library/react-hooks';
import { useReadBook } from './readBook'
import { api } from './../../plugins/axios'
afterEach(cleanup);
const mockData = {
  data: {
    id: "bb448b6b-3f4a-4d95-bf09-78e7445ed1e6",
    title: "テスト投稿",
    url: "https://example.com/",
    detail: "テスト書籍詳細",
    review: "テストレビュー",
    reviewer: "山田 花子2"
  }
}
it("fetches and displays data", async () => {
  // 初期レンダリング
  jest.spyOn(api, 'get').mockResolvedValue(mockData)
  const { result, waitForNextUpdate } = renderHook(() =>
    useReadBook(),
  );

  expect(result.current.isLoading).toBe(true); //ローディング中
  await waitForNextUpdate();

  expect(result.current.isLoading).toBe(false); //ローディング終了
  expect(result.current.errorText).toBe(""); //エラーなし
  expect(result.current.book?.title).toBe("テスト投稿"); //テキストの表示

  // エラーテスト
  await act(async () => {
    jest.spyOn(api, 'get').mockRejectedValue(new Error('Async error message'));
    try {
      await result.current.fetchBook()
    } catch (e) {
      expect(result.current.isLoading).toBe(false); //ローディング終了
      expect(result.current.errorText).toBe("Async error message"); //エラーあり
    }
  });

  // 予期せぬエラー
  await act(async () => {
    jest.spyOn(api, 'get').mockRejectedValue("");
    try {
      await result.current.fetchBook()
    } catch (e) {
      expect(result.current.isLoading).toBe(false); //ローディング終了
      expect(result.current.errorText).toBe("予期せぬエラー"); //エラーあり
    }
  });
});