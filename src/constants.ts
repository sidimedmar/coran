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
  },
  {
    id: '6',
    question: "Combien de Juz y a-t-il dans le Coran ?",
    options: ["20", "30", "40", "60"],
    correctAnswer: 1
  },
  {
    id: '7',
    question: "Quelle est la plus courte sourate du Coran ?",
    options: ["Al-Ikhlas", "Al-Kawthar", "An-Nas", "Al-Falaq"],
    correctAnswer: 1
  },
  {
    id: '8',
    question: "Quel prophète est le plus mentionné dans le Coran ?",
    options: ["Muhammad", "Ibrahim", "Moussa", "Issa"],
    correctAnswer: 2
  },
  {
    id: '9',
    question: "Quelle sourate ne commence pas par la Basmala ?",
    options: ["At-Tawbah", "Al-Anfal", "Al-Ma'idah", "Al-Hujurat"],
    correctAnswer: 0
  },
  {
    id: '10',
    question: "Combien de fois le nom 'Ramadan' est-il mentionné dans le Coran ?",
    options: ["1 fois", "2 fois", "3 fois", "5 fois"],
    correctAnswer: 0
  },
  {
    id: '11',
    question: "Quelle sourate est appelée 'La Mariée du Coran' ?",
    options: ["Ar-Rahman", "Al-Waqi'a", "Al-Mulk", "An-Nur"],
    correctAnswer: 0
  },
  {
    id: '12',
    question: "Combien d'ailes l'ange Jibril possède-t-il selon un hadith ?",
    options: ["2", "100", "600", "1000"],
    correctAnswer: 2
  },
  {
    id: '13',
    question: "Quel est le premier mot révélé du Coran ?",
    options: ["Allah", "Bismillah", "Iqra", "Al-Hamdu"],
    correctAnswer: 2
  },
  {
    id: '14',
    question: "Quelle sourate contient deux fois la Basmala ?",
    options: ["An-Naml", "Al-Baqarah", "Al-Fatiha", "Yasin"],
    correctAnswer: 0
  },
  {
    id: '15',
    question: "Quel prophète a construit l'Arche ?",
    options: ["Ibrahim", "Nuh", "Moussa", "Yunus"],
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
  },
  {
    id: '4',
    category: 'morning',
    title: 'Protection contre le mal',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    french: "Au nom d'Allah, tel qu'en compagnie de Son nom rien ne peut nuire sur terre ni dans le ciel, et Il est l'Audient, l'Omniscient.",
    transliteration: "Bismillahi-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim."
  },
  {
    id: '5',
    category: 'sleep',
    title: 'Verset du Trône (Ayat al-Kursi)',
    arabic: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ...',
    french: "Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même...",
    transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum..."
  }
];

export const READING_PLANS = [
  { id: '30days', name: '30 Jours (1 Juz/jour)', duration: 30, target: 1 },
  { id: '15days', name: '15 Jours (2 Juz/jour)', duration: 15, target: 2 },
  { id: '7days', name: '7 Jours (4.3 Juz/jour)', duration: 7, target: 4.3 },
  { id: 'free', name: 'Plan Libre', duration: 0, target: 0 }
];
