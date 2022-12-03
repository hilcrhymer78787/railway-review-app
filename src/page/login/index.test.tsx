import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import userEvent from "@testing-library/user-event";
import Login from "../login/index"

describe('Login component test', () => {

  test("render login", () => {
    render(<Login />, { wrapper: BrowserRouter });
    expect(screen.queryByTestId('email')).toBeTruthy()
    expect(screen.queryByTestId('password')).toBeTruthy()
    expect(screen.queryByTestId('submit')).toBeTruthy()
  })

  test("email test", () => {
    render(<Login />, { wrapper: BrowserRouter });

    const email = screen.queryByTestId('email')
    const submit = screen.queryByTestId('submit')

    if (!email) throw "emailがありません";
    if (!submit) throw "submitがありません";

    // メールアドレス・エラー
    userEvent.type(email, "test");
    userEvent.click(submit);
    expect(screen.queryByText("正しい形式で入力してください")).toBeTruthy();

    // メールアドレス・成功
    userEvent.type(email, "@gmail.com");
    userEvent.click(submit);
    expect(screen.queryByText('正しい形式で入力してください')).toBeNull();
  })

  test("password error", () => {
    render(<Login />, { wrapper: BrowserRouter });

    const password = screen.queryByTestId('password')
    const submit = screen.queryByTestId('submit')

    if (!password) throw "passwordがありません";
    if (!submit) throw "submitがありません";

    // パスワード・エラー
    userEvent.type(password, "test");
    userEvent.click(submit);
    expect(screen.queryByText("パスワードは8桁以上で設定してください")).toBeTruthy();

    // パスワード・成功
    userEvent.type(password, "1234");
    userEvent.click(submit);
    expect(screen.queryByText('パスワードは8桁以上で設定してください')).toBeNull();
  })

  test("submit success", () => {
    render(<Login />, { wrapper: BrowserRouter });

    const email = screen.queryByTestId('email')
    const password = screen.queryByTestId('password')
    const submit = screen.queryByTestId('submit')

    if (!email) throw "emailがありません";
    if (!password) throw "passwordがありません";
    if (!submit) throw "submitがありません";

    userEvent.type(password, "test@gmail.com");
    userEvent.type(password, "test1234");

    expect(screen.queryByText('パスワードは8桁以上で設定してください')).toBeNull();
    expect(screen.queryByText('正しい形式で入力してください')).toBeNull();
  })

});