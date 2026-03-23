import { describe, it } from "node:test";
import WordService from './WordService'
import assert from "node:assert/strict";

describe("Word Service", () => {
  const wordService = new WordService();
  it("Should return Ender's Game", async () => {
    const result = await wordService.getWord();
    assert.strictEqual(result, "Ender's Game");
  })
})
