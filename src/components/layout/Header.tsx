import React, { useState, useEffect } from 'react';
import { HeaderProps } from '../../types/components';

const motivationalPhrases = [
  "насколько важны твои задачи сегодня",
  "как много ты уже сделал",
  "о своих приоритетах на день",
  "о том, что действительно важно",
  "есть ли среди задач то, что можно делегировать",
  "как твои задачи приближают тебя к целям",
  "можно ли упростить сложные задачи",
  "о маленьких победах каждый день",
  "как организовать время эффективнее",
  "что самое важное сейчас",
  "нужно ли это делать сегодня",
  "о пользе небольших перерывов",
  "как управлять своей энергией",
  "можно ли объединить похожие задачи"
];

const Header: React.FC<HeaderProps> = ({ title, subtitle: defaultSubtitle }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(
    Math.floor(Math.random() * motivationalPhrases.length)
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => {
        const nextIndex = Math.floor(Math.random() * motivationalPhrases.length);
        // Избегаем повторения одной и той же фразы
        return nextIndex !== prevIndex ? nextIndex : (nextIndex + 1) % motivationalPhrases.length;
      });
    }, 2 * 60 * 1000); // 2 минуты
    
    return () => clearInterval(interval);
  }, []);
  
  const currentSubtitle = motivationalPhrases[currentPhraseIndex];
  
  return (
    <header className="text-center mb-10">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2 sm:mb-3">{title}</h1>
      <p className="text-secondary text-base sm:text-lg italic">
        {currentSubtitle}
      </p>
    </header>
  );
};

export default Header; 