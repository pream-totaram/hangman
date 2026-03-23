import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import WordEntry from './WordEntry';

vi.mock('../services/WordService', () => {
  return {
    default: class {
      getWord = vi.fn().mockResolvedValue("test");
    },
  };
});

test('renders and handles keyboard input', async () => {
  const user = userEvent.setup();
  const mockSetWrongGuesses = vi.fn();

  render(
    <WordEntry
      wrongGuessCounter={mockSetWrongGuesses}
      wrongGuessNumber={0}
    />
  );

  await user.keyboard('e');

  const element = screen.getByText(/E/i);
  expect(element).toString();
});
