import { test, expect } from 'vitest';
import { GET } from './route';

test('GET /api/word should return a 200 status', async () => {
  const response = await GET();
  expect(response.status).toBe(200);
});

test('GET /api/word should return the correct message', async () => {
  const response = await GET();
  const data = await response.json();

  expect(data.message).toBe("Ender's Game");
});
