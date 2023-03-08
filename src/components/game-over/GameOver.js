import './Game-Over.css';
import React from 'react'

const GameOver = ({ reiniciar, score }) => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h3>Sua pontuação foi: <span>{score}</span></h3>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  )
}

export default GameOver;