import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderHook, act } from '@testing-library/react-hooks';
import { useReadBooks } from './readBooks'
import { api } from './../../plugins/axios'
afterEach(cleanup);
const mockData = {
  data: [
    {
      id: "bb448b6b-3f4a-4d95-bf09-78e7445ed1e6",
      title: "テスト投稿",
      url: "https://example.com/",
      detail: "テスト書籍詳細",
      review: "テストレビュー",
      reviewer: "山田 花子2"
    },
    {
      id: "eac7371c-bd7e-4390-9c1a-c8f0a47d4c37",
      title: "あけましておめでとう",
      url: "https://campaign.line.me/otoshidama2023/",
      detail: "あけおめスタンプ",
      review: "使いやすい",
      reviewer: "sota"
    },
    {
      id: "11dcec49-2ae4-4ece-9dfd-dc01ad69f2de",
      title: "プログラマ脳を鍛える数学パズル シンプルで高速なコードが書けるようになる70問",
      url: "https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E8%84%B3%E3%82%92%E9%8D%9B%E3%81%88%E3%82%8B%E6%95%B0%E5%AD%A6%E3%83%91%E3%82%BA%E3%83%AB-%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%A7%E9%AB%98%E9%80%9F%E3%81%AA%E3%82%B3%E3%83%BC%E3%83%89%E3%81%8C%E6%9B%B8%E3%81%91%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%82%8B70%E5%95%8F-%E5%A2%97%E4%BA%95-%E6%95%8F%E5%85%8B/dp/479814245X/?_encoding=UTF8&pd_rd_w=ExNv7&content-id=amzn1.sym.f31583d7-4476-4245-bc64-29622a5a7938&pf_rd_p=f31583d7-4476-4245-bc64-29622a5a7938&pf_rd_r=ET10GTNG3WZZP0NBFD1V&pd_rd_wg=8J9z3&pd_rd_r=5d72e239-b03d-469a-9d56-f918c07acca9&ref_=pd_gw_ci_mcx_mi",
      detail: "アルゴリズムを鍛えるものらしい",
      review: "ほしい",
      reviewer: "aaaxsa"
    },
  ]
}
it("fetches and displays data", async () => {
  // 初期レンダリング
  const { result } = renderHook(() =>
    useReadBooks(),
  );
  // エラーテスト
  await act(async () => {
    jest.spyOn(api, 'get').mockResolvedValue(mockData)
    try {
      await result.current.fetchBooks(0)
    } catch (e) { }
    console.log(result.current.books);
    expect(result.current.isLoading).toBe(false); //ローディング終了
    expect(result.current.errorText).toBe(""); //エラーなし
    expect(result.current.books[0].title).toBe("テスト投稿"); //テキストの表示
  });
  // エラーテスト
  await act(async () => {
    jest.spyOn(api, 'get').mockRejectedValue(new Error('Async error message'));
    try {
      await result.current.fetchBooks(1)
    } catch (e) {
      expect(result.current.isLoading).toBe(false); //ローディング終了
      expect(result.current.errorText).toBe("Async error message"); //エラーあり
    }
  });

  // 予期せぬエラー
  await act(async () => {
    jest.spyOn(api, 'get').mockRejectedValue("");
    try {
      await result.current.fetchBooks(1)
    } catch (e) {
      expect(result.current.isLoading).toBe(false); //ローディング終了
      expect(result.current.errorText).toBe("予期せぬエラー"); //エラーあり
    }
  });
});