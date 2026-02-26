import { Surah, Verse, PrayerTimes } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const QuranService = {
  async getSurahs(): Promise<Surah[]> {
    const response = await fetch(`${BASE_URL}/surah`);
    const data = await response.json();
    return data.data;
  },

  async getSurahDetail(number: number, edition: string = 'quran-uthmani'): Promise<any> {
    const response = await fetch(`${BASE_URL}/surah/${number}/${edition}`);
    const data = await response.json();
    return data.data;
  },

  async getVerseWithTranslation(surah: number, ayah: number, translationEdition: string = 'fr.hamidullah'): Promise<Verse> {
    // Get Arabic
    const arRes = await fetch(`${BASE_URL}/ayah/${surah}:${ayah}/quran-uthmani`);
    const arData = await arRes.json();
    
    // Get Translation
    const trRes = await fetch(`${BASE_URL}/ayah/${surah}:${ayah}/${translationEdition}`);
    const trData = await trRes.json();

    // Get Audio
    const audioRes = await fetch(`${BASE_URL}/ayah/${surah}:${ayah}/ar.alafasy`);
    const audioData = await audioRes.json();

    return {
      number: arData.data.number,
      text: arData.data.text,
      translation: trData.data.text,
      audio: audioData.data.audio,
      surahName: arData.data.surah.name,
      surahNumber: arData.data.surah.number,
      verseNumberInSurah: arData.data.numberInSurah
    };
  },

  async getPrayerTimes(city: string, country: string, method: number = 3): Promise<PrayerTimes> {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`);
    const data = await response.json();
    return data.data.timings;
  },

  async getPrayerTimesByCoords(lat: number, lng: number): Promise<PrayerTimes> {
    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}`);
    const data = await response.json();
    return data.data.timings;
  },

  async searchVerses(keyword: string, edition: string = 'fr.hamidullah'): Promise<Verse[]> {
    const response = await fetch(`${BASE_URL}/search/${keyword}/all/${edition}`);
    const data = await response.json();
    if (!data.data || !data.data.matches) return [];
    
    return data.data.matches.map((match: any) => ({
      number: match.number,
      text: match.text,
      surahName: match.surah.name,
      surahNumber: match.surah.number,
      verseNumberInSurah: match.numberInSurah
    }));
  }
};
