"use client"
import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [testActive, setTestActive] = useState(false);
  const [listeningToInput, setListeningToInput] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [allLetters, setAllLetters] = useState([])
  const [currentLetter, setCurrentLetter] = useState()
  const [time1, setTime1] = useState()
  const [time2, setTime2] = useState()
  const ref = useRef();
  const targetLetter = 'T';

  const generateRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => letter !== targetLetter);
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  };

  const generateRandomArray = (length) => {
    return Array.from({ length }, () => generateRandomLetter());
  };

  const placeTInMiddle = (arr) => {
    // Insert 'T' in the middle of the array
    const middleIndex = Math.floor(arr.length / 2);
    const newArray = [...arr];
    newArray.splice(middleIndex, 0, targetLetter);
    return newArray;
  };

  const handleKeyDown = (event) => {
    if (listeningToInput) {
      console.log(`Current letter: ${currentLetter}`)
      const userResponseTime = performance.now() - startTime;
      setListeningToInput(false);
      console.log(`Your reaction time: ${userResponseTime} ms`)
    }
  }

  useEffect(() => {
    if(allLetters.length == 0) {
      setAllLetters(placeTInMiddle(generateRandomArray(15)))
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
      console.log("Complete")
      setListeningToInput(false);
      setTestActive(false);
      setCurrentIndex(0)
    }
  }, [currentIndex, testActive, allLetters.length]);

  const startTest = () => {
    setTestActive(true);
    setTime1(performance.now())
  };

  const showNextLetter = () => {
    const thisLetter = allLetters[currentIndex];
    setCurrentLetter(allLetters[currentIndex])    
    if (currentIndex < allLetters.length) {
      if (thisLetter === targetLetter) {
        setListeningToInput(true);
        setStartTime(performance.now());
        console.log("Start listen")
      }
    }
    console.log(`Laiks: ${performance.now() - time1}`)
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='flex h-64 justify-center items-center text-9xl'>
        {testActive && currentIndex < allLetters.length ? currentLetter : ''}
        {/* {console.log(`Burts: ${currentLetter}`)} */}
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

export default Home;


