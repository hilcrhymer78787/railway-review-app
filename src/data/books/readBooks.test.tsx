import axios from 'axios';
import { useReadBooks } from "./readBooks";
import { screen, render, cleanup, waitFor } from "@testing-library/react";

afterEach(cleanup);


jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => {
      return {
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      };
    }),
    get: jest.fn(() => {
      return {
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn().mockResolvedValue({ data: {} }) },
        },
      };
    }),
  },
}));
// describe('first test', () => {
//   test("render Signup", async () => {
//     (axios.get as any).mockResolvedValueOnce('hogehoge')
//     const res = await axios.get("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json")
//     expect(res).toEqual('hogehoge')
//   })
// })

describe('first test', () => {
  test("render Signup", async () => {
    // const Test = () => {
    //   (axios.get as any).mockResolvedValueOnce({ data: 'hogehoge' })
    //   const { books, isLoading, fetchBooks } = useReadBooks();
    //   return <>{isLoading ? 'isLoading' : 'notisLoading'}</>
    // }
    // render(<Test />);
    // await waitFor(() => { });
    // screen.debug();
  })
})