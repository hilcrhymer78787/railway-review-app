import { render, screen } from '@testing-library/react';
import App from "../../App"

it('render login', () => {
  render(<App />);
  expect(screen.queryByTestId('email')).toBeTruthy()
  expect(screen.queryByTestId('password')).toBeTruthy()
  expect(screen.queryByTestId('submit')).toBeTruthy()
});



