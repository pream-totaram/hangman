'use client'

import { useEffect, useRef } from "react"

interface HangmanCanvasProps {
  wrongGuesses: number
  width?: number
  height?: number
  className?: string
}

export default function HangmanCanvas({
  wrongGuesses,
  width = 400,
  height = 500,
  className = ''
}: HangmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    //base (0 wrong guesses, always shown)
    ctx.beginPath();
    ctx.moveTo(50, 450);
    ctx.lineTo(250, 450);
    ctx.stroke()

    if (wrongGuesses >= 1) {
      //Vertical Pole
      ctx.beginPath();
      ctx.moveTo(100, 450);
      ctx.lineTo(100, 50);
      ctx.stroke();
    }

    if (wrongGuesses >= 2) {
      // Top horizontal beam
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(250, 50);
      ctx.stroke();
    }

    if (wrongGuesses >= 3) {
      // Rope
      ctx.beginPath();
      ctx.moveTo(250, 50);
      ctx.lineTo(250, 100);
      ctx.stroke();
    }

    if (wrongGuesses >= 4) {
      //Head
      ctx.beginPath();
      ctx.arc(250, 130, 30, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (wrongGuesses >= 5) {
      //Body
      ctx.beginPath();
      ctx.moveTo(250, 160);
      ctx.lineTo(250, 280);
      ctx.stroke();
    }

    if (wrongGuesses >= 6) {
      //left arm
      ctx.beginPath();
      ctx.moveTo(250, 190);
      ctx.lineTo(200, 250);
      ctx.stroke();
    }

    if (wrongGuesses >= 7) {
      //Right arm
      ctx.beginPath();
      ctx.moveTo(250, 190);
      ctx.lineTo(300, 250);
      ctx.stroke();
    }

    if (wrongGuesses >= 8) {
      //Left Leg
      ctx.beginPath();
      ctx.moveTo(250, 280);
      ctx.lineTo(200, 350);
      ctx.stroke();
    }

    if (wrongGuesses >= 9) {
      //Right Leg
      ctx.beginPath();
      ctx.moveTo(250, 280);
      ctx.lineTo(300, 350);
      ctx.stroke();
    }
  }, [wrongGuesses, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  )
}
