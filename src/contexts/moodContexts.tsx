import React, { createContext, useContext, useState } from 'react';

type Mood = {
  name: string;
  colors: readonly [string, string];
};

const moods: Mood[] = [
  { name: '🌍 Exploração Cósmica', colors: ['#030a42', '#000000'] },
  { name: '🪐 Lo-fi Galáctico', colors: ['#239fc4', '#000000'] },
  { name: '💫 Nebulosa Violeta', colors: ['#841fd1', '#000000'] },
  { name: '☄️ Chuva de Meteoros', colors: ['#d97811', '#000000'] },
  { name: '✨ Tranquilidade Estelar', colors: ['#a782c4', '#000000'] },
  { name: '🌙 Aurora Boreal', colors: ['#33bf2e', '#000000']},
  { name: '🔥 Supernova Flamejante', colors: ['#ff2200', '#000000']},
  { name: '⚡ Pulsar Elétrico',colors: ['#b3b029', '#000000']},
  { name: '🌌 Galáxia Retro',colors: ['#ee9ca7', '#000000']}


];

type MoodContextType = {
  currentMoodIndex: number;
  setCurrentMoodIndex: React.Dispatch<React.SetStateAction<number>>;
  moods: Mood[];
  changeMood: () => void;
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);

  const changeMood = () => {
    setCurrentMoodIndex((prev) => (prev + 1) % moods.length);
  };

  return (
    <MoodContext.Provider value={{ currentMoodIndex, setCurrentMoodIndex, moods, changeMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood deve ser usado dentro de <MoodProvider>');
  }
  return context;
};
