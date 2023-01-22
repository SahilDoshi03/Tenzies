import './App.css';
import Die from './Components/Die';
import { useState, useEffect } from 'react';

function App() {

  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
    
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
}, [dice])

  function allNewDice(){    
    const values = []
    for(let x = 0; x < 10; x++){
        values.push({
          isHeld: false,
          value: Math.ceil(Math.random()*6),
          id: x
        })
    }
    return values
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}

  const diceElements = dice.map((die) => {
      return (
        <Die 
          key = {die.id}
          value = {die.value} 
          isHeld = {die.isHeld}
          hold = {() => holdDice(die.id)}
        />
      )
  }) 


  function rollDice(){
    if(!tenzies){
      setDice(prevDice => prevDice.map((die)=>{
        return (
          die.isHeld? 
            {...die}
            :{...die,value: Math.ceil(Math.random()*6)} 
      )}))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  return (
    <div className="app">
      <main>
        <div className="title">Tenzies</div>
        <ul className="instructions">
          <li>Click on Dice to hold the value</li>
          <li>Roll to change the values of unheld Dice</li>
          <li>Play till all Dice are held and all have the same value</li>
        </ul>
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick = {rollDice} className="roll-btn">{tenzies?"Reset":"Roll"}</button>
      </main>
    </div>
  );
}

export default App;
