import './Game.css';
import React, { useState, useRef } from 'react';

const Game = ({ verificao, pickedWord, pickedCategory, letters, 
  guessedLetters, wordLetters, guesses, score }) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    verificao(letter);
    setLetter("");
  }
  return (
    <div>
      <p className='points'>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra: </h1>
      <h3 className='tipo'>Dica sobre a palavra: 
        <span> {pickedCategory} </span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className='wordContainer'>
        {letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
              <span key={i} className='letter'> {letter} </span>
            ) : (
              <span key={i} className='blankSquare'></span>
            )
          ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input type='text' name='letter' maxLength='1' required 
            onChange={(e) => setLetter(e.target.value)} value={letter.toLowerCase()} ref={letterInputRef} >
          </input>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas: </p>
        {wordLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </div>
  )
}

export default Game;