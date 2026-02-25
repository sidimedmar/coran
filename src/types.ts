export interface Verse {
  number: number;
  text: string;
  translation?: string;
  transliteration?: string;
  audio?: string;
  surahName?: string;
  surahNumber?: number;
  verseNumberInSurah?: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface ReadingPlan {
  id: string;
  name: string;
  durationDays: number;
  targetJuzPerDay: number;
  startDate: string;
  progress: number[]; // Array of ayah numbers completed
}

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  french: string;
  transliteration: string;
  category: 'morning' | 'evening' | 'sleep' | 'wake' | 'travel';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type Language = 'fr' | 'ar';

export interface AppState {
  language: Language;
  theme: 'light' | 'dark';
  currentSurah: number;
  currentAyah: number;
  favorites: number[]; // Verse numbers
  history: number[]; // Verse numbers
  readingPlan: ReadingPlan | null;
}
