import { useCallback, useEffect, useState } from 'react';
import './App.css';
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';
import words from './assets/WordList.ts';  

function App() {
  // Function to get a random word from the words list
  const getWord = useCallback((): string => {
    const randomIndex = Math.floor(Math.random() * words.length); // Random index
    return words[randomIndex];  // Return random word
  }, []);

  // State management
  const [wordToGuess, setWordToGuess] = useState(getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Compute incorrect and game status values
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

  // Function to handle letter addition
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return; // Prevent updates if game is over
      setGuessedLetters(currentLetters => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  // Keyboard event listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    if (!isWinner && !isLoser) {
      document.addEventListener('keypress', handler);
    }

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [addGuessedLetter, isWinner, isLoser]);

  // Styles for container
  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    margin: '0 auto',
    alignItems: 'center',
  };

  const resultTextStyle: React.CSSProperties = {
    fontSize: '2rem',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      {/* Display Result with Emojis */}
      <div style={resultTextStyle}>
        {isWinner && (
          <span role="img" aria-label="win">
            🎉 Congratulations, You Won! 🎉
          </span>
        )}
        {isLoser && (
          <span role="img" aria-label="lose">
😔 Man Hanged! The correct word was '{wordToGuess}' 😔          </span>
        )}
      </div>

      {/* Hangman Drawing */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

      {/* Hangman Word */}
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

      {/* Keyboard */}
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inActiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isWinner || isLoser}
        />
      </div>
    </div>
  );
}

export default App;
