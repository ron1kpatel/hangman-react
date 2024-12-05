import React from "react";

// Define the props type
type HangmanDrawingProps = {
  numberOfGuesses: number;
};

// Base style for parts of the hangman
const BASE_PART_STYLE: React.CSSProperties = {
  position: "absolute",
  background: "black",
};

// Body parts of the hangman
const HEAD = (
  <div
    style={{
      ...BASE_PART_STYLE,
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "10px solid black",
      top: "50px",
      right: "-30px",
    }}
  />
);

const BODY = (
  <div
    style={{
      ...BASE_PART_STYLE,
      width: "10px",
      height: "100px",
      top: "120px",
      right: 0,
    }}
  />
);

const RIGHT_ARM = (
  <div
    style={{
      ...BASE_PART_STYLE,
      width: "100px",
      height: "10px",
      top: "150px",
      right: "-100px",
      transform: "rotate(-30deg)",
      transformOrigin: "left bottom",
    }}
  />
);

const LEFT_ARM = (
  <div
    style={{
      ...BASE_PART_STYLE,
      width: "100px",
      height: "10px",
      top: "150px",
      right: "10px",
      transform: "rotate(30deg)",
      transformOrigin: "right bottom",
    }}
  />
);

const RIGHT_LEG = (
  <div
    style={{
      ...BASE_PART_STYLE,
      width: "100px",
      height: "10px",
      top: "210px",
      right: "-90px",
      transform: "rotate(60deg)",
      transformOrigin: "left bottom",
    }}
  />
);

const LEFT_LEG = (
  <div
    style={{
      ...BASE_PART_STYLE,
      width: "100px",
      height: "10px",
      top: "210px",
      right: 0,
      transform: "rotate(-60deg)",
      transformOrigin: "right bottom",
    }}
  />
);

// Array of body parts to render
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

// Main Component
export default function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div
      style={{
        position: "relative",
        margin: "0 auto",
        width: "250px",
        height: "400px",
      }}
    >
      {/* Render body parts based on incorrect guesses */}
      {BODY_PARTS.slice(0, numberOfGuesses).map((part, index) => (
        <div key={index}>{part}</div>
      ))}

      {/* Gallows */}
      <div
        style={{
          ...BASE_PART_STYLE,
          height: "50px",
          width: "10px",
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: "10px",
          width: "200px",
          marginLeft: "120px",
          background: "black",
        }}
      />
      <div
        style={{
          height: "400px",
          width: "10px",
          marginLeft: "120px",
          background: "black",
        }}
      />
      <div
        style={{
          height: "10px",
          width: "250px",
          background: "black",
        }}
      />
    </div>
  );
}
