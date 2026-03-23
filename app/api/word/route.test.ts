import { test, expect } from 'vitest';
import { GET } from './route';

test('GET /api/hello should return a 200 status', async () => {
  const response = await GET();
  expect(response.status).toBe(200);
});

test('GET /api/hello should return the correct message', async () => {
  const response = await GET();
  const data = await response.json();

  expect(data.message).toBe("Ender's Game");
});
