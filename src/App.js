import './App.css';
//REACT
import { useCallback, useEffect, useState } from 'react';
//DATA
import { wordsList } from './data/words';
//COMPONENTS
import Start from './components/start/Start';
import Game from './components/game/Game';
import GameOver from './components/game-over/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [ gameStage, setGameStage ] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordsAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];    
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word , category };
  }
  //
  const startGame = () => {
    clearLetterStates();
    //pick word and pick category
    const { word, category} = pickWordsAndCategory();    
    // create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(wordLetters);
    //states    
    setPickedWord(word);
    setLetters(wordLetters);
    setPickedCategory(category);
    setGameStage(stages[1].name);
  }
  //
  const verificaLetra = (letter) => {    
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }
    if(letters.includes(letter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        letter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }
  useEffect(() => {
    if(guesses <= 0) {
      setGameStage(stages[2].name);
      clearLetterStates();
    }
  },[guesses])
  //
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)];
    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore+=100);
      startGame();
    }
  },[guessedLetters])
  //
  const restart = () => {
    setGameStage(stages[0].name);
    setScore(0);
    setGuesses(3);
  }
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <Start startGame={startGame} />}
      {gameStage === 'game' && 
      <Game verificao={verificaLetra} pickedWord={pickedWord} pickedCategory={pickedCategory} 
      letters={letters}  guessedLetters={guessedLetters} wordLetters={wrongLetters} guesses={guesses}
      score={score}
      />}
      {gameStage === 'end' && <GameOver reiniciar={restart} score={score} />}
    </div>
  );
}

export default App;
