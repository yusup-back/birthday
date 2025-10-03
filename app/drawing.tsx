"use client";

import { useEffect, useRef, useState } from "react";

export default function DrawingStep({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Подсказка сердца
  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawHeart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,105,180,0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 5);
      ctx.bezierCurveTo(w, -h / 5, w, h / 2, w / 2, h - h / 5);
      ctx.bezierCurveTo(0, h / 2, 0, -h / 5, w / 2, h / 5);
      ctx.stroke();
    };

    drawHeart(ctx, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    drawingRef.current = true;
    setIsDrawing(true);
    lastPointRef.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const current = getPos(e);
    if (!lastPointRef.current) {
      lastPointRef.current = current;
      return;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ff69b4";

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(current.x, current.y);
    ctx.stroke();

    lastPointRef.current = current;
  };

  const endDrawing = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    drawingRef.current = false;
    lastPointRef.current = null;
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-pink-600 mb-4">
        Нарисуй сердечко ❤️
      </h2>
      <div
        className="canvas-container relative"
        style={{ width: 300, height: 300, touchAction: "none" }}
      >
        {/* Подсказка */}
        <canvas
          ref={overlayRef}
          width={300}
          height={300}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        />
        {/* Основной canvas */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{ position: "absolute", top: 0, left: 0 }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          onTouchCancel={endDrawing}
        />
      </div>
      <button
        onClick={onComplete}
        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md"
      >
        Готово ✨
      </button>
    </div>
  );
}
