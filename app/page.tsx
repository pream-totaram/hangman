'use client'

import { useRef, useState } from "react";
import HangmanCanvas from "./components/HangmanCanvas";
import WordEntry from "./components/WordEntry";
import Keyboard from "./components/Keyboard";

export default function Home() {
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const wordEntryRef = useRef<HTMLDivElement>(null);

  const triggerKeyPress = (key: string) => {
    if (wordEntryRef.current) {
      const keyBoardEvent = new KeyboardEvent('keydown', {
        key: key,
        code: `Key${key}`,
        bubbles: true,
        cancelable: true
      });

      wordEntryRef.current.dispatchEvent(keyBoardEvent);
    }
  }
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
        ref={wordEntryRef}
        className="word-entry border-2 sm:w-full md:w-1/2 pt-6 pb-2 pr-6 pl-6 text-center mt-20 border-gray-300 rounded-lg bg-white"
        wrongGuessCounter={setWrongGuesses}
        wrongGuessNumber={wrongGuesses}
      />

      <Keyboard onLetterClick={triggerKeyPress} />

    </div>
  );
}
