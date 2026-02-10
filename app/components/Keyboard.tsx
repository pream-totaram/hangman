import { useRef, useState } from "react"

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
}

export default function Keyboard({ onLetterClick }: KeyboardProps) {
  const rows = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    'zxcvbnm'.split('')
  ];

  return (
    <div className="keyboard flex flex-col gap-2 mt-8 w-full max-w-2xl px-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 sm:gap-2  justify-center" >
          {row.map((letter) => (

            <button
              key={letter}
              className="bg-slate-500 text-white font-bold py-2 px-3 rounded"
              onClick={() => onLetterClick(letter)}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      ))

      }
    </div>
  )
}
