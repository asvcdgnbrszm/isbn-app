import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const {isbn10Checksum, isbn13Checksum} = require('isbn-check/src/isbn-check');
  const [isbnString, setIsbnString] = useState('');

  let [resultMessage, setResultMessage] = useState('');
  let result = false;
  
  let isbn = require('node-isbn');
  let [bookInfo, setBookInfo] = useState('');

  let authors = [];
  let thumbnailLink = '';


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

    if (result == isbnString.slice(-1)){
      //setResultMessage('ISBN valid');
      setResultMessage('');
      isbn.provider(['openlibrary']).resolve(isbnString, function (err, book) {
        if (err) {
            //console.log('Book not found', err);
            setResultMessage('ISBN is valid but book was not found');
            setBookInfo();
        } else {
            //console.log('Book found', book);
            setBookInfo(book);
        }
      });
    }else{
      setResultMessage('ISBN invalid');
      setBookInfo();
    }  
  }

  if (bookInfo) {
    authors = bookInfo.authors.map((author, index) =>
      <li key={index}>{author}</li>
    );
    thumbnailLink = bookInfo.imageLinks.thumbnail;
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ISBN-Checker</h1>
        <input type="text" value={isbnString} onInput={handleKeyUp}></input>
        <button onClick={() => checkISBN(isbnString)}>Check ISBN</button>
        <p style={{color: resultMessage === 'ISBN valid' ? "green" : "red" }}>{resultMessage}</p>
        <div>
          <h3>{bookInfo ? bookInfo.title : ''}</h3>
          <ul>{authors}</ul>
          <p>{bookInfo ? bookInfo.description : ''}</p>
          <img src={thumbnailLink}/>
        </div>
      </header>
    </div>
  );
}

export default App;
