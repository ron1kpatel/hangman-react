type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
  };
  
  export default function HangmanWord({ guessedLetters, wordToGuess }: HangmanWordProps) {
    const guessedLettersSet = new Set(guessedLetters); // Set for fast lookup
    const letterStyle: React.CSSProperties = {
      borderBottom: ".1em solid black",
      margin: 10,
    };
  
    const visibleLetterStyle: React.CSSProperties = {
      visibility: "visible",
    };
  
    const hiddenLetterStyle: React.CSSProperties = {
      visibility: "hidden",
    };
  
    return (
      <div
        style={{
          display: "flex",
          gap: ".25rem",
          fontSize: "6rem",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        {wordToGuess.split("").map((letter, index) => (
          <span key={index} style={letterStyle}>
            <span
              style={guessedLettersSet.has(letter) ? visibleLetterStyle : hiddenLetterStyle}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
    );
  }
  