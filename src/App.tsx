/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, 
  Calendar, 
  Clock, 
  Heart, 
  History, 
  Search, 
  Settings, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft,
  Moon,
  Sun,
  Award,
  BookOpen,
  Map as MapIcon,
  Bell,
  Languages,
  Volume2,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuranService } from './services/quranService';
import { Surah, Verse, PrayerTimes, Dua, Language, ReadingPlan } from './types';
import { DUAS, READING_PLANS, QUIZ_QUESTIONS } from './constants';

// --- Translations ---

const translations = {
  fr: {
    reader: 'Lecteur',
    plan: 'Plan',
    tools: 'Outils',
    quiz: 'Quiz',
    settings: 'Réglages',
    quran: 'Le Saint Coran',
    surah: 'Sourate',
    verse: 'Verset',
    search: 'Rechercher',
    loading: 'Chargement...',
    totalProgress: 'Progression Totale',
    daysRemaining: 'Jours Restants',
    targetPerDay: 'Objectif/Jour',
    ramadanCalendar: 'Calendrier Ramadan',
    day: 'Jour',
    completed: 'Terminé',
    markRead: 'Marquer lu',
    prayerTimes: 'Horaires de Prière',
    nextPrayerIn: 'Prochaine: {name} dans {time}',
    duas: 'Invocations (Douas)',
    searchDua: 'Rechercher une doua...',
    quizTitle: 'Quiz Coranique',
    quizDesc: 'Testez vos connaissances sur les versets et les sourates du Coran.',
    startQuiz: 'Commencer le Quiz',
    question: 'Question {n} sur {total}',
    score: 'Score',
    retry: 'Réessayer',
    perfect: 'Parfait !',
    bravo: 'Bravo !',
    general: 'Général',
    language: 'Langue / اللغة',
    darkMode: 'Mode Sombre',
    notifications: 'Notifications',
    enable: 'Activer',
    about: 'À propos',
    aboutDesc: 'Mon Coran Ramadan est conçu pour vous accompagner durant le mois sacré. Puisse Allah accepter nos œuvres.',
    version: 'Version',
    current: 'Actuelle',
    searchKeyword: 'Rechercher par mot-clé...',
    surahProgress: 'Progression par Sourate',
    all: 'Tous',
    morning: 'Matin',
    sleep: 'Sommeil',
    travel: 'Voyage',
    results: 'Résultats'
  },
  ar: {
    reader: 'القراءة',
    plan: 'الخطة',
    tools: 'أدوات',
    quiz: 'مسابقة',
    settings: 'إعدادات',
    quran: 'القرآن الكريم',
    surah: 'سورة',
    verse: 'آية',
    search: 'بحث',
    loading: 'جاري التحميل...',
    totalProgress: 'التقدم الإجمالي',
    daysRemaining: 'الأيام المتبقية',
    targetPerDay: 'الهدف اليومي',
    ramadanCalendar: 'تقويم رمضان',
    day: 'يوم',
    completed: 'تم',
    markRead: 'تحديد كمقروء',
    prayerTimes: 'مواقيت الصلاة',
    nextPrayerIn: 'التالية: {name} خلال {time}',
    duas: 'أدعية',
    searchDua: 'بحث عن دعاء...',
    quizTitle: 'مسابقة قرآنية',
    quizDesc: 'اختبر معلوماتك عن آيات وسور القرآن الكريم.',
    startQuiz: 'ابدأ المسابقة',
    question: 'سؤال {n} من {total}',
    score: 'النتيجة',
    retry: 'إعادة المحاولة',
    perfect: 'ممتاز!',
    bravo: 'أحسنت!',
    general: 'عام',
    language: 'اللغة / Langue',
    darkMode: 'الوضع الليلي',
    notifications: 'التنبيهات',
    enable: 'تفعيل',
    about: 'حول التطبيق',
    aboutDesc: 'تم تصميم "قرآني في رمضان" لمرافقتك خلال الشهر الفضيل. تقبل الله منا ومنكم صالح الأعمال.',
    version: 'الإصدار',
    current: 'الحالية',
    searchKeyword: 'بحث بالكلمات...',
    surahProgress: 'التقدم حسب السورة',
    all: 'الكل',
    morning: 'الصباح',
    sleep: 'النوم',
    travel: 'السفر',
    results: 'النتائج'
  }
};

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, language }: { activeTab: string, setActiveTab: (t: string) => void, language: Language }) => {
  const t = translations[language];
  const tabs = [
    { id: 'reader', icon: BookOpen, label: t.reader },
    { id: 'plan', icon: Calendar, label: t.plan },
    { id: 'tools', icon: Clock, label: t.tools },
    { id: 'quiz', icon: Award, label: t.quiz },
    { id: 'settings', icon: Settings, label: t.settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-primary/10 px-4 py-2 flex justify-around items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'text-secondary scale-110' : 'text-primary/40'
          }`}
        >
          <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

const QuranReader = ({ language, completedAyahs, toggleAyahRead }: { 
  language: Language, 
  completedAyahs: Set<number>, 
  toggleAyahRead: (num: number) => void 
}) => {
  const t = translations[language];
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [searchSurah, setSearchSurah] = useState('');
  const [searchAyah, setSearchAyah] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Verse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [autoPlayVerse, setAutoPlayVerse] = useState<number | null>(null);

  useEffect(() => {
    QuranService.getSurahs().then(setSurahs);
  }, []);

  useEffect(() => {
    loadSurah(selectedSurah);
  }, [selectedSurah]);

  useEffect(() => {
    if (!loading && autoPlayVerse !== null) {
      const verseToPlay = verses.find(v => v.verseNumberInSurah === autoPlayVerse);
      if (verseToPlay) {
        playAudio(verseToPlay.number);
        const target = verseRefs.current[autoPlayVerse];
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setAutoPlayVerse(null);
    }
  }, [loading, verses, autoPlayVerse]);

  const loadSurah = async (num: number) => {
    setLoading(true);
    try {
      const arData = await QuranService.getSurahDetail(num, 'quran-uthmani');
      const frData = await QuranService.getSurahDetail(num, 'fr.hamidullah');
      
      const combinedVerses = arData.ayahs.map((ayah: any, index: number) => ({
        number: ayah.number,
        text: ayah.text,
        translation: frData.ayahs[index].text,
        surahNumber: num,
        verseNumberInSurah: ayah.numberInSurah
      }));
      
      setVerses(combinedVerses);
    } catch (error) {
      console.error("Error loading surah:", error);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (verseNumber: number) => {
    if (playingVerse === verseNumber) {
      audioRef.current?.pause();
      setPlayingVerse(null);
      return;
    }

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verseNumber}.mp3`;
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlayingVerse(verseNumber);
    }
  };

  const skipAudio = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleKeywordSearch = async () => {
    if (!keyword.trim()) return;
    setIsSearching(true);
    try {
      const results = await QuranService.searchVerses(keyword, language === 'ar' ? 'ar.alafasy' : 'fr.hamidullah');
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    const sNum = parseInt(searchSurah);
    const aNum = parseInt(searchAyah);
    if (!isNaN(sNum) && sNum >= 1 && sNum <= 114) {
      if (sNum === selectedSurah) {
        const target = verseRefs.current[aNum];
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const verseToPlay = verses.find(v => v.verseNumberInSurah === aNum);
          if (verseToPlay) playAudio(verseToPlay.number);
        }
      } else {
        setSelectedSurah(sNum);
        setAutoPlayVerse(aNum);
      }
    }
  };

  const navigateVerse = (direction: 'prev' | 'next', currentAyahNum: number) => {
    const nextNum = direction === 'next' ? currentAyahNum + 1 : currentAyahNum - 1;
    const target = verseRefs.current[nextNum];
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const verseToPlay = verses.find(v => v.verseNumberInSurah === nextNum);
      if (verseToPlay) playAudio(verseToPlay.number);
    } else {
      if (direction === 'next' && selectedSurah < 114) {
        setSelectedSurah(selectedSurah + 1);
        setAutoPlayVerse(1);
      } else if (direction === 'prev' && selectedSurah > 1) {
        setSelectedSurah(selectedSurah - 1);
        // For previous surah, we don't know the last ayah number easily without fetching.
        // But we can set a flag to play the last one if we had that info.
        // For simplicity, we'll just switch surah.
      }
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-2xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold text-primary">
            {t.quran}
          </h1>
          <select 
            value={selectedSurah}
            onChange={(e) => setSelectedSurah(Number(e.target.value))}
            className="bg-white border border-primary/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            {surahs.map(s => (
              <option key={s.number} value={s.number}>
                {s.number}. {language === 'ar' ? s.name : s.englishName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder={t.surah} 
            value={searchSurah}
            onChange={(e) => setSearchSurah(e.target.value)}
            className="bg-white border border-primary/10 rounded-xl px-3 py-2 text-sm w-full focus:ring-2 focus:ring-secondary/50 outline-none"
          />
          <input 
            type="number" 
            placeholder={t.verse} 
            value={searchAyah}
            onChange={(e) => setSearchAyah(e.target.value)}
            className="bg-white border border-primary/10 rounded-xl px-3 py-2 text-sm w-full focus:ring-2 focus:ring-secondary/50 outline-none"
          />
          <button 
            onClick={handleSearch}
            className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder={t.searchKeyword} 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleKeywordSearch()}
            className="bg-white border border-primary/10 rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-secondary/50 outline-none"
          />
          <button 
            onClick={handleKeywordSearch}
            className={`absolute ${language === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 text-primary/40 hover:text-secondary`}
          >
            <Search size={18} />
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="bg-white/50 backdrop-blur-sm border border-primary/5 rounded-2xl p-4 max-h-64 overflow-y-auto space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold uppercase text-primary/40">{t.results} ({searchResults.length})</h3>
              <button onClick={() => setSearchResults([])} className="text-[10px] text-secondary font-bold uppercase">Clear</button>
            </div>
            {searchResults.map((res) => (
              <div 
                key={`${res.surahNumber}-${res.verseNumberInSurah}`}
                onClick={() => {
                  setSelectedSurah(res.surahNumber);
                  setAutoPlayVerse(res.verseNumberInSurah);
                  setSearchResults([]);
                }}
                className="p-3 bg-white rounded-xl border border-primary/5 cursor-pointer hover:border-secondary/30 transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-secondary">{res.surahName} : {res.verseNumberInSurah}</span>
                </div>
                <p className="text-xs text-primary line-clamp-2">{res.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {verses.map((v) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={v.number} 
              ref={el => verseRefs.current[v.verseNumberInSurah!] = el}
              className={`glass-card rounded-2xl p-6 relative overflow-hidden group transition-all duration-500 ${playingVerse === v.number ? 'ring-2 ring-secondary bg-secondary/5' : ''} ${completedAyahs.has(v.number) ? 'opacity-60 border-emerald-500/20' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                    {v.verseNumberInSurah}
                  </span>
                  <button 
                    onClick={() => toggleAyahRead(v.number)}
                    title={t.markRead}
                    className={`p-1.5 rounded-full transition-colors ${completedAyahs.has(v.number) ? 'bg-emerald-500 text-white' : 'bg-primary/5 text-primary/20 hover:text-emerald-500'}`}
                  >
                    <Book size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigateVerse('prev', v.verseNumberInSurah!)}
                    className="p-1.5 text-primary/20 hover:text-primary transition-colors"
                  >
                    {language === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  </button>
                  <button 
                    onClick={() => playAudio(v.number)}
                    className={`p-1.5 transition-colors ${playingVerse === v.number ? 'text-secondary' : 'text-primary/40 hover:text-secondary'}`}
                  >
                    {playingVerse === v.number ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button 
                    onClick={() => navigateVerse('next', v.verseNumberInSurah!)}
                    className="p-1.5 text-primary/20 hover:text-primary transition-colors"
                  >
                    {language === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                  </button>
                </div>
              </div>

              {playingVerse === v.number && (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <button onClick={() => skipAudio(-15)} className="text-primary/40 hover:text-primary"><RotateCcw size={16} /></button>
                    <div className="flex-1 h-1 bg-primary/5 rounded-full overflow-hidden relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-secondary transition-all duration-300"
                        style={{ width: `${(audioProgress / audioDuration) * 100}%` }}
                      />
                    </div>
                    <button onClick={() => skipAudio(15)} className="text-primary/40 hover:text-primary"><RotateCw size={16} /></button>
                  </div>
                  <div className="flex justify-between text-[8px] text-primary/40 font-mono">
                    <span>{Math.floor(audioProgress / 60)}:{Math.floor(audioProgress % 60).toString().padStart(2, '0')}</span>
                    <span>{Math.floor(audioDuration / 60)}:{Math.floor(audioDuration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              )}
              
              <p className="arabic-text text-3xl leading-relaxed mb-6 text-right text-primary">
                {v.text}
              </p>
              
              <p className={`text-primary/70 text-sm leading-relaxed font-light italic border-t border-primary/5 pt-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? v.text : v.translation}
              </p>
            </motion.div>
          ))}
        </div>
      )}
      <audio 
        ref={audioRef} 
        onEnded={() => setPlayingVerse(null)} 
        onTimeUpdate={() => setAudioProgress(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setAudioDuration(audioRef.current?.duration || 0)}
      />
    </div>
  );
};

const ReadingPlanView = ({ language, completedAyahs }: { language: Language, completedAyahs: Set<number> }) => {
  const t = translations[language];
  const totalAyahs = 6236;
  const progress = Math.round((completedAyahs.size / totalAyahs) * 100);
  const [surahs, setSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    QuranService.getSurahs().then(setSurahs);
  }, []);

  // Mock surah progress for demo
  const getSurahProgress = (num: number) => {
    return (num * 7) % 100;
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-2xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">
        {t.plan}
      </h1>

      <div className="glass-card rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
          <div className="text-sm uppercase tracking-widest text-primary/40 mb-2 font-bold">{t.totalProgress}</div>
          <div className="text-6xl font-serif font-bold text-primary mb-4">{progress}%</div>
          <div className="w-full bg-primary/5 h-3 rounded-full overflow-hidden mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-secondary h-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 rounded-2xl p-4">
              <div className="text-xs text-primary/40 mb-1">{t.daysRemaining}</div>
              <div className="text-xl font-bold">18</div>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4">
              <div className="text-xs text-primary/40 mb-1">{t.targetPerDay}</div>
              <div className="text-xl font-bold">1 Juz</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-sm uppercase tracking-widest text-primary/40 font-bold mb-4 px-2">{t.surahProgress}</h2>
        <div className="space-y-3">
          {surahs.slice(0, 10).map(s => {
            const p = getSurahProgress(s.number);
            return (
              <div key={s.number} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-secondary w-6">{s.number}</span>
                  <span className="text-sm font-medium text-primary">{language === 'ar' ? s.name : s.englishName}</span>
                </div>
                <div className="flex items-center gap-4 flex-1 max-w-[120px] ml-4">
                  <div className="flex-1 h-1.5 bg-primary/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${p}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-primary/40">{p}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary/60 px-2">{t.ramadanCalendar}</h2>
        {[1, 2, 3, 4, 5].map((day) => (
          <div key={day} className="glass-card rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${day < 4 ? 'bg-secondary text-white' : 'bg-primary/5 text-primary/40'}`}>
                {day}
              </div>
              <div>
                <div className="font-bold">{t.day} {day}</div>
                <div className="text-xs text-primary/40">Juz {day} - Versets 1-141</div>
              </div>
            </div>
            {day < 4 ? (
              <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{t.completed}</div>
            ) : (
              <button className="text-secondary hover:underline text-sm font-bold">{t.markRead}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ToolsView = ({ language }: { language: Language }) => {
  const t = translations[language];
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [activeDua, setActiveDua] = useState<Dua | null>(null);
  const [duaSearch, setDuaSearch] = useState('');
  const [duaCategory, setDuaCategory] = useState('all');
  const [nextPrayer, setNextPrayer] = useState<{ name: string, time: string, remaining: string } | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);

  useEffect(() => {
    QuranService.getPrayerTimes('Nouakchott', 'Mauritania').then(setPrayerTimes);
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;

    const timer = setInterval(() => {
      const now = new Date();
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      let foundNext = false;
      let current = null;

      for (let i = 0; i < prayers.length; i++) {
        const name = prayers[i];
        const [hours, minutes] = (prayerTimes as any)[name].split(':').map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0);

        if (prayerDate > now) {
          if (!foundNext) {
            const diff = prayerDate.getTime() - now.getTime();
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            setNextPrayer({ 
              name, 
              time: (prayerTimes as any)[name], 
              remaining: `${h}h ${m}m` 
            });
            foundNext = true;
          }
        } else {
          current = name;
        }
      }

      if (!foundNext) {
        setNextPrayer({ name: 'Fajr', time: prayerTimes.Fajr, remaining: '--' });
        current = 'Isha';
      }
      
      setCurrentPrayer(current);
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const filteredDuas = DUAS.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(duaSearch.toLowerCase()) ||
      d.french.toLowerCase().includes(duaSearch.toLowerCase()) ||
      d.arabic.includes(duaSearch);
    const matchesCategory = duaCategory === 'all' || d.category === duaCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'morning', 'sleep', 'travel'];

  return (
    <div className="pb-24 pt-6 px-4 max-w-2xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">
        {t.tools}
      </h1>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-sm uppercase tracking-widest text-primary/40 font-bold">{t.prayerTimes}</h2>
          {nextPrayer && (
            <div className="bg-secondary/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-full animate-pulse">
              {t.nextPrayerIn.replace('{name}', nextPrayer.name).replace('{time}', nextPrayer.remaining)}
            </div>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {prayerTimes && Object.entries(prayerTimes).filter(([k]) => ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(k)).map(([name, time]) => (
            <div key={name} className={`glass-card rounded-2xl p-3 text-center border-2 transition-all ${currentPrayer === name ? 'border-secondary bg-secondary/10 scale-105 shadow-lg' : 'border-transparent'}`}>
              <div className="text-[8px] uppercase font-bold text-primary/40 mb-1">{name}</div>
              <div className="text-sm font-serif font-bold text-primary">{time}</div>
              {currentPrayer === name && <div className="text-[8px] text-secondary font-bold mt-1 uppercase tracking-tighter">{t.current}</div>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-4 mb-6 px-2">
          <h2 className="text-sm uppercase tracking-widest text-primary/40 font-bold">{t.duas}</h2>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setDuaCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap ${duaCategory === cat ? 'bg-secondary text-white shadow-md' : 'bg-white border border-primary/5 text-primary/40'}`}
              >
                {(t as any)[cat]}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-primary/20`} size={18} />
            <input 
              type="text" 
              placeholder={t.searchDua}
              value={duaSearch}
              onChange={(e) => setDuaSearch(e.target.value)}
              className={`w-full bg-white border border-primary/10 rounded-2xl ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-sm focus:ring-2 focus:ring-secondary/50 outline-none`}
            />
          </div>
        </div>
        <div className="space-y-4">
          {filteredDuas.map((dua) => (
            <div 
              key={dua.id} 
              onClick={() => setActiveDua(activeDua?.id === dua.id ? null : dua)}
              className="glass-card rounded-2xl p-6 cursor-pointer hover:border-secondary/30 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary">{dua.title}</h3>
                <ChevronRight size={18} className={`text-primary/20 transition-transform ${activeDua?.id === dua.id ? 'rotate-90' : ''} ${language === 'ar' ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {activeDua?.id === dua.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="arabic-text text-2xl text-right text-primary my-4 leading-relaxed">{dua.arabic}</p>
                    <p className="text-xs text-primary/40 italic mb-4">{dua.transliteration}</p>
                    <p className={`text-sm text-primary/70 leading-relaxed border-t border-primary/5 pt-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? dua.arabic : dua.french}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuizView = ({ language }: { language: Language }) => {
  const t = translations[language];
  const [step, setStep] = useState<'start' | 'question' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startQuiz = () => {
    setStep('question');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    const correct = optionIndex === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setStep('result');
      }
    }, 1500);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div className="pb-24 pt-6 px-4 max-w-2xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={48} className="text-secondary" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-primary mb-4">
              {t.quizTitle}
            </h1>
            <p className="text-primary/60 mb-8 max-w-xs mx-auto">
              {t.quizDesc}
            </p>
            <button 
              onClick={startQuiz}
              className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              {t.startQuiz}
            </button>
          </motion.div>
        )}

        {step === 'question' && (
          <motion.div 
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
              {t.question.replace('{n}', (currentQuestionIndex + 1).toString()).replace('{total}', QUIZ_QUESTIONS.length.toString())}
            </div>
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">{currentQuestion.question}</h2>
            <div className="grid gap-4">
              {currentQuestion.options.map((opt, idx) => (
                <button 
                  key={opt}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  className={`glass-card rounded-2xl p-5 text-left font-medium transition-all border-2 shadow-sm ${
                    selectedOption === idx 
                      ? (isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50')
                      : (selectedOption !== null && idx === currentQuestion.correctAnswer ? 'border-emerald-500 bg-emerald-50' : 'border-transparent')
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-2">
              {score === QUIZ_QUESTIONS.length ? t.perfect : t.bravo}
            </h2>
            <div className="text-xl text-secondary font-bold mb-8">{t.score}: {score}/{QUIZ_QUESTIONS.length}</div>
            <button 
              onClick={() => setStep('start')}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all"
            >
              {t.retry}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SettingsView = ({ language, setLanguage, theme, setTheme }: { 
  language: Language, 
  setLanguage: (l: Language) => void,
  theme: 'light' | 'dark',
  setTheme: (t: 'light' | 'dark') => void
}) => {
  const t = translations[language];
  return (
    <div className="pb-24 pt-6 px-4 max-w-2xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">
        {t.settings}
      </h1>

      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-4">{t.general}</h2>
          
          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <div className="flex items-center gap-3">
              <Languages size={20} className="text-primary/60" />
              <span className="font-medium">{t.language}</span>
            </div>
            <div className="flex bg-primary/5 rounded-full p-1">
              <button 
                onClick={() => setLanguage('fr')}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'fr' ? 'bg-white shadow-sm text-primary' : 'text-primary/40'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLanguage('ar')}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'ar' ? 'bg-white shadow-sm text-primary' : 'text-primary/40'}`}
              >
                AR
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-primary/5">
            <div className="flex items-center gap-3">
              {theme === 'light' ? <Sun size={20} className="text-primary/60" /> : <Moon size={20} className="text-primary/60" />}
              <span className="font-medium">{t.darkMode}</span>
            </div>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-12 h-6 bg-primary/10 rounded-full relative transition-all"
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${theme === 'dark' ? 'left-7 bg-secondary' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-primary/60" />
              <span className="font-medium">{t.notifications}</span>
            </div>
            <button className="text-secondary font-bold text-sm">{t.enable}</button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-4">{t.about}</h2>
          <p className="text-sm text-primary/60 leading-relaxed">
            {t.aboutDesc}
          </p>
          <div className="mt-4 text-[10px] text-primary/30 uppercase font-bold">{t.version} 1.0.0</div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('reader');
  const [language, setLanguage] = useState<Language>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [completedAyahs, setCompletedAyahs] = useState<Set<number>>(new Set());

  const toggleAyahRead = (num: number) => {
    setCompletedAyahs(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-accent'}`}>
      <main className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'reader' && (
            <motion.div key="reader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuranReader 
                language={language} 
                completedAyahs={completedAyahs} 
                toggleAyahRead={toggleAyahRead} 
              />
            </motion.div>
          )}
          {activeTab === 'plan' && (
            <motion.div key="plan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ReadingPlanView language={language} completedAyahs={completedAyahs} />
            </motion.div>
          )}
          {activeTab === 'tools' && (
            <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ToolsView language={language} />
            </motion.div>
          )}
          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuizView language={language} />
            </motion.div>
          )}
          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SettingsView 
                language={language} 
                setLanguage={setLanguage} 
                theme={theme} 
                setTheme={setTheme} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
    </div>
  );
}
