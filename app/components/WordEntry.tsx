'use client'

import { KeyboardEventHandler, useEffect, useRef } from "react";

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
  const WORD = 'test';
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.focus();
  }, []);

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!WORD.includes(event.key)) {
      wrongGuessCounter?.((wrongGuessNumber ?? 0) + 1)
    }
  }

  return (
    <div
      ref={divRef}
      className={className}
      onKeyDown={handleKeyPress}
      tabIndex={0}>
      {WORD.split("").map((letter, index) => (
        <span className="blank-letter" key={'letter-' + index}></span>
      ))}
    </div>
  )
}
