import { useEffect, useState } from "react";

export default function MiniPuzzle({
  sentences = [
    "Я люблю тебя любимая 💕",
    "Сильно сильно люблю 🌟",
    "Я всегда буду рядом ❤️",
    "Да ты фто моя дорогая 💐",
  ],
  onComplete,
}: {
  sentences?: string[];
  onComplete: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const sentence = sentences[currentIndex];

  useEffect(() => {
    const splitWords = sentence.split(" ");
    setWords(splitWords);

    // Перемешиваем слова
    const shuffledWords = [...splitWords].sort(() => Math.random() - 0.5);
    setShuffled(shuffledWords);
    setSelected([]);
  }, [sentence]);

  const selectWord = (word: string) => {
    setSelected([...selected, word]);
    setShuffled(shuffled.filter((w) => w !== word));
  };

  const reset = () => {
    setSelected([]);
    setShuffled([...words].sort(() => Math.random() - 0.5));
  };

  const isCorrect = selected.join(" ") === sentence;

  const nextSentence = () => {
    if (currentIndex + 1 < sentences.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(); // Все фразы собраны
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-pink-600 mb-4">
        Собери фразу 💖
      </h2>

      <div className="flex flex-wrap justify-center mb-4 gap-2">
        {shuffled.map((word, idx) => (
          <button
            key={idx}
            onClick={() => selectWord(word)}
            className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded-full shadow-sm"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center mb-4 gap-2 min-h-[40px]">
        {selected.map((word, idx) => (
          <span
            key={idx}
            className="bg-pink-400 text-white px-4 py-2 rounded-full shadow-sm"
          >
            {word}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
        >
          Сбросить
        </button>

        {isCorrect && (
          <button
            onClick={nextSentence}
            className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-white"
          >
            {currentIndex + 1 < sentences.length ? "Следующая 🎉" : "Готово 🏆"}
          </button>
        )}
      </div>
    </div>
  );
}
