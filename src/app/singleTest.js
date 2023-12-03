"use client"
import React, { useState, useEffect, useRef } from 'react';

const Test = ({testNumber, setReactionTime,setIsActive}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [testActive, setTestActive] = useState(false);
  const [listeningToInput, setListeningToInput] = useState(false);
  const [allLetters, setAllLetters] = useState([])
  const [currentLetter, setCurrentLetter] = useState()
  const targetLetter = 'T';

  const generateRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => letter !== targetLetter);
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  };

  const generateRandomArray = (length) => {
    return Array.from({ length }, () => generateRandomLetter());
  };

  const placeT = (arr) => {
    let index = 9
    if(testNumber == 1) {
      index = 9
    }

    if(testNumber == 2) {
      index = 19
    }

    if(testNumber == 3) {
      index = 29
    }
    const newArray = [...arr];
    newArray.splice(index, 0, targetLetter);
    return newArray;
  };

  const handleKeyDown = (event) => {
    if (listeningToInput) {
      const userResponseTime = performance.now() - startTime;
      setReactionTime(userResponseTime)
      setListeningToInput(false);
    }
  }

  useEffect(() => {
    if(allLetters.length == 0) {
      setAllLetters(placeT(generateRandomArray(39)))
    }
  }, [])
  
  useEffect(() => {
    if(testActive && currentIndex == 0) {
      setCurrentLetter("+")
      // setTimeout(100000)
    }
    if (testActive && currentIndex < allLetters.length) {
      setTimeout(() => {
        setCurrentLetter("")
        setTimeout(() => {
          showNextLetter();
        }, 50); // Pause between
      }, 150); // Time letter is shown
      
    } else if (testActive && currentIndex === allLetters.length) {
      setListeningToInput(false);
      setTestActive(false);
      setIsActive(true)
      setCurrentIndex(0)
    }
  }, [currentIndex, testActive, allLetters.length]);

  const startTest = () => {
    setTestActive(true);
    setIsActive(false)
  };

  const showNextLetter = () => {
    const thisLetter = allLetters[currentIndex];
    setCurrentLetter(allLetters[currentIndex])    
    if (currentIndex < allLetters.length) {
      if (thisLetter === targetLetter) {
        setListeningToInput(true);
        setStartTime(performance.now());
      }
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='flex h-64 justify-center items-center text-9xl'>
        {testActive && currentIndex < allLetters.length ? currentLetter : ''}
      </div>

      {testActive &&
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50" onClick={handleKeyDown}>
          Spied šeit
        </button>
      }

    
      {!testActive && 
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50" disabled={listeningToInput} onClick={startTest}>
          Sākt testu
        </button>
      }
      
    </div>
  );
};

export default Test;
