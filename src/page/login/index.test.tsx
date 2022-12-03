import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom'
import Login from "../login/index"

it('render login', () => {
  render(<Login />, {wrapper: BrowserRouter});
  expect(screen.queryByTestId('email')).toBeTruthy()
  expect(screen.queryByTestId('password')).toBeTruthy()
  expect(screen.queryByTestId('submit')).toBeTruthy()
});



