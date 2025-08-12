import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders headline text', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /yelp dx/i })
  ).toBeInTheDocument();
});
