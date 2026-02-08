'use client'

import { useState } from "react";
import HangmanCanvas from "./components/HangmanCanvas";
import WordEntry from "./components/WordEntry";

export default function Home() {
  const [wrongGuesses, setWrongGuesses] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Hangman Game</h1>
      <HangmanCanvas
        wrongGuesses={wrongGuesses}
        width={400}
        height={500}
        className="border-2 border-gray-300 rounded-lg bg-white"
      />

      <WordEntry
        className="border-2 w-1/2 pt-6 pd-6 pr-6 pl-6 text-center mt-20 border-gray-300 rounded-lg bg-white"
        wrongGuessCounter={setWrongGuesses}
        wrongGuessNumber={wrongGuesses}
      />

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setWrongGuesses(Math.max(0, wrongGuesses - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >Previous</button>
        <button
          onClick={() => setWrongGuesses(Math.min(9, wrongGuesses + 1))}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >Wrong Guess</button>
        <button
          onClick={() => setWrongGuesses(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600"
        >Reset</button>
      </div>
      <p className="mt-4 text-lg">Wrong Guesses: {wrongGuesses}/9</p>
    </div>
  );
}
