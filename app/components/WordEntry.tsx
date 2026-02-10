'use client'

import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import WordService from '../services/WordService'

interface WordEntryProps {
  className?: string
  wrongGuessNumber?: number
  wrongGuessCounter?: (numWrongGuesses: number) => void

}

export default function WordEntry({
  className = '',
  wrongGuessCounter,
  wrongGuessNumber
}: WordEntryProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const [updatedIndices, setUpdatedIndices] = useState<number[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");

  useEffect(() => {
    divRef.current?.focus();
    const wordService = new WordService();
    setSelectedWord(wordService.getWord());

  }, []);

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!selectedWord.includes(event.key)) {
      wrongGuessCounter?.((wrongGuessNumber ?? 0) + 1)
    } else {

      let matches = [...selectedWord.matchAll(new RegExp(event.key, "gi"))];
      let indices = matches.map((el) => el.index)
      setUpdatedIndices((prev) => [...prev, ...indices]);
    }
  }

  return (
    <div
      ref={divRef}
      className={className}
      onKeyDown={handleKeyPress}
      tabIndex={0}>
      {selectedWord.split("").map((letter, index) => (
        <span className="letter" key={index}>
          {updatedIndices.includes(index) ? letter : ""}
        </span>
      ))}
    </div>
  )
}
