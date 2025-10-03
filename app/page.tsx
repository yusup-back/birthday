"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import DrawingStep from "./drawing";
import MiniPuzzle from "./words";
const puzzles = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

export default function Home() {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const nextLevel = () => {
    setSolved(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    if (level < puzzles.length - 1) {
      setLevel(level + 1);
    } else {
      setStep(3); // переход к Step 3
    }
  };

  const handleNextStep = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setStep(step + 1);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 p-6 text-center">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={100} />}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md bg-white/80 p-6 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Сегодня твой день 🎉
          </h1>
          <p className="mb-4 text-lg text-black">
            Готова пройти маленький квест и получить сюрприз?
          </p>

          <button
            onClick={handleNextStep}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md"
          >
            Начать 💖
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md bg-white/80 p-6 rounded-2xl shadow-xl flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Уровень {level + 1} 🧩
          </h2>

          <div className="w-full flex justify-center mb-4">
            <JigsawPuzzle
              rows={3}
              columns={3}
              imageSrc={puzzles[level]}
              onSolved={() => setSolved(true)}
            />
          </div>

          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full shadow-md disabled:opacity-50"
            // disabled={!solved}
            onClick={nextLevel}
          >
            Дальше
          </button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md bg-white/80 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex flex-col items-center">
            <DrawingStep onComplete={handleNextStep} />
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md bg-white/90 p-6 rounded-2xl shadow-xl"
        >
          <MiniPuzzle
            onComplete={handleNextStep} // переходим к финальному сюрпризу
          />
        </motion.div>
      )}

      {step === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md bg-white/80 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            Задание 3 🌹
          </h2>
          <p className="mb-4 text-black">
            Чтобы открыть сюрприз, скажи вслух: <br />
            <span className="font-bold text-pink-700">
              "Я самая любимая" 💕
            </span>
          </p>
          <button
            onClick={handleNextStep}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md"
          >
            Я сказала 😘
          </button>
        </motion.div>
      )}

      {step === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md bg-white/90 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-pink-600 mb-4">
            🎁 Сюрприз 🎁
          </h2>
          <p className="mb-4 text-lg text-black">
            С днём рождения, моя любовь ❤️ Ты — самое дорогое, что у меня есть.
            Пусть этот год принесёт тебе счастье, радость и море нежности. А я
            обещаю быть рядом и делать твои дни особенными ✨ И даже когда меня
            нет рядом или тебе становится скучно по мне — приходи сюда чаще,
            ведь здесь кусочек меня и моей любви к тебе 💕
          </p>
        </motion.div>
      )}
    </div>
  );
}
