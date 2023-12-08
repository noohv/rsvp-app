"use client"
import React, { useState, useEffect } from 'react'

const Test = ({testNumber, setReactionTime, setTestFinished, setShowTutorial, setClickCount}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [testActive, setTestActive] = useState(false)
  const [listeningToInput, setListeningToInput] = useState(false)
  const [allLetters, setAllLetters] = useState([])
  const [currentLetter, setCurrentLetter] = useState()
  const [showCross, setShowCross] = useState(false)
  const targetLetter = 'T'

  const generateRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => letter !== targetLetter)
    const randomIndex = Math.floor(Math.random() * letters.length)
    return letters[randomIndex]
  }

  const generateRandomArray = (length) => {
    return Array.from({ length }, () => generateRandomLetter())
  }

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
    const newArray = [...arr]
    newArray.splice(index, 0, targetLetter)
    return newArray
  }

  const handleKeyDown = (event) => {
    if (listeningToInput) {
      const userResponseTime = performance.now() - startTime
      setReactionTime(userResponseTime)
      setListeningToInput(false)
    }
    setClickCount(prev => prev + 1)
  }

  useEffect(() => {
    if(allLetters.length == 0) {
      setAllLetters(placeT(generateRandomArray(39)))
    }
  }, [])
  
  useEffect(() => {
    if(testActive && showCross && currentIndex == 0) {
      setCurrentLetter("+")
      setTimeout(() => {
        setShowCross(false)
      }, 2000)
    }
    if (testActive && !showCross && currentIndex < allLetters.length) {
      setTimeout(() => {
        setCurrentLetter("")
        setTimeout(() => {
          showNextLetter()
        }, 50) // Pause between
      }, 150) // Time letter is shown
      
    } else if (testActive && currentIndex === allLetters.length) {
      setCurrentLetter("")
      setTimeout(() => {
        setListeningToInput(false)
        setTestActive(false)
        setTestFinished(true)
        setCurrentIndex(0)
        setShowTutorial(true)
      }, 2000)

    }
  }, [currentIndex, testActive, allLetters.length, showCross])

  const startTest = () => {
    setShowCross(true)
    setTestActive(true)
    setTestFinished(false)  
    setShowTutorial(false)
    setClickCount(0)
  }

  const showNextLetter = () => {
    const thisLetter = allLetters[currentIndex]
    setCurrentLetter(allLetters[currentIndex])    
    if (currentIndex < allLetters.length) {
      if (thisLetter === targetLetter) {
        setListeningToInput(true)
        setStartTime(performance.now())
      }
    }
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex h-64 justify-center items-center text-9xl'>
        {testActive && currentIndex < allLetters.length ? currentLetter : ''}
      </div>

      {testActive &&
        <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded w-50" onClick={handleKeyDown}>
          Spied šeit
        </button>
      }

    
      {!testActive &&
        <>
          <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded w-50" disabled={listeningToInput} onClick={startTest}>
            Sākt testu
          </button>
        </> 
      }
      
    </div>
  )
}

export default Test
