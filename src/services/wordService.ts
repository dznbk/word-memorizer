import Papa from 'papaparse';
import { Word } from '../types/word';

export const fetchWords = async (): Promise<Word[]> => {
  return new Promise((resolve, reject) => {
    const url = `${process.env.PUBLIC_URL}/data/words.csv`;
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (result) => {
        resolve(result.data as Word[]);
      },
      error: (error) => reject(error),
    });
  });
};
