import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const {isbn10Checksum, isbn13Checksum} = require('isbn-check/src/isbn-check');
  const [isbnString, setIsbnString] = useState('');

  let [resultMessage, setResultMessage] = useState('');
  let result = false;
  

  function handleKeyUp(event){
    setIsbnString(event.target.value)
  }

  function checkISBN(isbnString){
    if (isbnString.length === 10) { 
      result = isbn10Checksum(isbnString.slice(0, -1));
    }
    if (isbnString.length === 13) { 
      result = isbn13Checksum(isbnString.slice(0, -1));
    }
    console.log(result);

    if (result == isbnString.slice(-1)){
      setResultMessage('ISBN valid');
    }else{
      setResultMessage('ISBN invalid');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ISBN-Checker</h1>
        <input type="text" value={isbnString} onInput={handleKeyUp}></input>
        <button onClick={() => checkISBN(isbnString)}>Check ISBN</button>
        <p style={{color: resultMessage === 'ISBN valid' ? "green" : "red" }}>{resultMessage}</p>
      </header>
    </div>
  );
}

export default App;
