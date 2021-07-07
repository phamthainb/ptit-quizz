import React from 'react';
import { render, screen } from '@testing-library/react';
import ListQuizz from './ListQuizz';

test('renders learn react link', () => {
  render(<ListQuizz />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
