type KeyboardProps = {
    activeLetters: string[];
    disabled: boolean;
    inActiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
  };
  
  export default function Keyboard({
    activeLetters,
    disabled,
    inActiveLetters,
    addGuessedLetter,
  }: KeyboardProps) {
    const ACTIVE_SET = new Set(activeLetters);  // Set for fast lookup
    const INACTIVE_SET = new Set(inActiveLetters);  // Set for fast lookup
    const KEYS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i).toLowerCase());  // Generate keys
  
    // Define button styles
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
      gap: '0.5rem',
    };
  
    return (
      <div style={gridStyle}>
        {KEYS.map((key) => (
          <button
            key={key}
            className={`btn ${ACTIVE_SET.has(key) ? 'active' : ''} ${INACTIVE_SET.has(key) ? 'inactive' : ''}`}
            onClick={() => addGuessedLetter(key)}
            disabled={ACTIVE_SET.has(key) || INACTIVE_SET.has(key) || disabled}
          >
            {key}
          </button>
        ))}
      </div>
    );
  }
  