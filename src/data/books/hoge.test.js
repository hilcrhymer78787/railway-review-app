import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import Fetch from "./hoge";

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
    get: jest.fn().mockResolvedValue({ data: {} })
  },
}));

it("fetches and displays data", async () => {
  axiosMock.get.mockResolvedValueOnce({ data: { greeting: "hello there" } });

  const { getByTestId } = render(<Fetch />);
  expect(getByTestId("loading")).toHaveTextContent("NowLoading");

  const resolvedSpan = await waitFor(() => getByTestId("resolved"));
  expect(resolvedSpan).toHaveTextContent("hello there");

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});