'use client'

import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import WordService from '../services/WordService'

interface WordEntryProps {
  className?: string
  wrongGuessNumber?: number
  wrongGuessCounter?: (numWrongGuesses: number) => void

}
const wordService = new WordService();
const WORD = wordService.getWord();


export default function WordEntry({
  className = '',
  wrongGuessCounter,
  wrongGuessNumber
}: WordEntryProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const [updatedIndices, setUpdatedIndices] = useState<number[]>([]);

  useEffect(() => {
    divRef.current?.focus();
  }, []);

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!WORD.includes(event.key)) {
      wrongGuessCounter?.((wrongGuessNumber ?? 0) + 1)
    } else {

      let matches = [...WORD.matchAll(new RegExp(event.key, "gi"))];
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
      {WORD.split("").map((letter, index) => (
        <span className="letter" key={index}>
          {updatedIndices.includes(index) ? letter : ""}
        </span>
      ))}
    </div>
  )
}
