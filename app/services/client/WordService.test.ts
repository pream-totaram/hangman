import { test, expect } from 'vitest';
import WordService from './WordService'

test("Word Service Should return Ender's Game", async () => {
  const wordService = new WordService();
  const result = await wordService.getWord();
  expect(result).toBe("Ender's Game")
})
