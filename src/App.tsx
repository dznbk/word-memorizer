import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWords } from './services/wordService';
import { Word } from './types/word';

const  App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      const fetchedWords = await fetchWords();
      setWords(fetchedWords);
      setCurrentWord(fetchedWords[Math.floor(Math.random() * fetchedWords.length)]);
    };
    loadWords();
  }, []);

  const handleShowMeaning = () => {
    setShowMeaning(true);
  }

  const handleNextWord = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setShowMeaning(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>英単語帳</h1>
        <p>ランダムに選ばれた英単語とその意味を学びましょう。</p>
      </header>
      <main className="main-content">
        {currentWord && (
          <div>
            <p>単語：{currentWord.word}</p>
            {showMeaning && <p>意味：{currentWord.meaning}</p>}
          </div>
        )}
        <button onClick={handleShowMeaning}>意味を表示</button>
        <button onClick={handleNextWord}>他の単語を表示</button>
      </main>
    </div>
  );
}

export default App;
