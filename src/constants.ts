import { Dua, QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: "Quelle est la plus longue sourate du Coran ?",
    options: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "Yasin"],
    correctAnswer: 1
  },
  {
    id: '2',
    question: "Combien de sourates y a-t-il dans le Coran ?",
    options: ["110", "112", "114", "120"],
    correctAnswer: 2
  },
  {
    id: '3',
    question: "Quelle sourate est appelée 'Le Cœur du Coran' ?",
    options: ["Al-Mulk", "Ar-Rahman", "Yasin", "Al-Waqi'a"],
    correctAnswer: 2
  },
  {
    id: '4',
    question: "Dans quelle ville le Coran a-t-il commencé à être révélé ?",
    options: ["Médine", "Jérusalem", "La Mecque", "Taïf"],
    correctAnswer: 2
  },
  {
    id: '5',
    question: "Quel est le mois de la révélation du Coran ?",
    options: ["Rajab", "Ramadan", "Shawwal", "Dhul-Hijjah"],
    correctAnswer: 1
  }
];

export const DUAS: Dua[] = [
  {
    id: '1',
    category: 'morning',
    title: 'Invocation du matin',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    french: "Nous sommes au matin et la royauté appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Seul, sans associé.",
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah."
  },
  {
    id: '2',
    category: 'sleep',
    title: 'Avant de dormir',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    french: "C'est en Ton nom, ô Allah, que je meurs et que je vis.",
    transliteration: "Bismika Allahumma amutu wa ahya."
  },
  {
    id: '3',
    category: 'travel',
    title: 'Invocation du voyage',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    french: "Gloire à Celui qui a mis ceci à notre service alors que nous n'étions pas capables de le dominer. Et c'est vers notre Seigneur que nous retournerons.",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinina wa inna ila Rabbina lamunqalibun."
  }
];

export const READING_PLANS = [
  { id: '30days', name: '30 Jours (1 Juz/jour)', duration: 30, target: 1 },
  { id: '15days', name: '15 Jours (2 Juz/jour)', duration: 15, target: 2 },
  { id: '7days', name: '7 Jours (4.3 Juz/jour)', duration: 7, target: 4.3 },
  { id: 'free', name: 'Plan Libre', duration: 0, target: 0 }
];
