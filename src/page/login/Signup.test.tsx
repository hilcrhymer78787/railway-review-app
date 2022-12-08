import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import userEvent from "@testing-library/user-event";
import Signup from "./Signup"

describe('Signup component test', () => {

  test("render Signup", () => {
    render(<Signup />, { wrapper: BrowserRouter });
    expect(screen.queryByTestId('name')).toBeTruthy()
    expect(screen.queryByTestId('email')).toBeTruthy()
    expect(screen.queryByTestId('password')).toBeTruthy()
    expect(screen.queryByTestId('submit')).toBeTruthy()
  })

  test("name test", () => {
    render(<Signup />, { wrapper: BrowserRouter });

    const name = screen.queryByTestId('name')
    const submit = screen.queryByTestId('submit')

    if (!name) throw "nameがありません";
    if (!submit) throw "submitがありません";

    // 名前・エラー
    userEvent.click(submit);
    expect(screen.queryByText("名前を入力してください")).toBeTruthy();

    // 名前・成功
    userEvent.type(name, "テスト");
    userEvent.click(submit);
    expect(screen.queryByText('名前を入力してください')).toBeNull();
  })

  test("email test", () => {
    render(<Signup />, { wrapper: BrowserRouter });

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
    render(<Signup />, { wrapper: BrowserRouter });

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
    render(<Signup />, { wrapper: BrowserRouter });

    const name = screen.queryByTestId('name')
    const email = screen.queryByTestId('email')
    const password = screen.queryByTestId('password')
    const submit = screen.queryByTestId('submit')

    if (!name) throw "nameがありません";
    if (!email) throw "emailがありません";
    if (!password) throw "passwordがありません";
    if (!submit) throw "submitがありません";

    userEvent.type(name, "テスト");
    userEvent.type(email, "test@gmail.com");
    userEvent.type(password, "test1234");
    userEvent.click(submit);

    expect(screen.queryByText('名前を入力してください')).toBeNull();
    expect(screen.queryByText('パスワードは8桁以上で設定してください')).toBeNull();
    expect(screen.queryByText('正しい形式で入力してください')).toBeNull();
  })

});