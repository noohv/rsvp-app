"use client";
import React, { useState, useEffect } from "react";

const Test = ({
  setReactionTime,
  setTestFinished,
  setShowTutorial,
  setClickCount,
  currentTest,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [testActive, setTestActive] = useState(false);
  const [listeningToInput, setListeningToInput] = useState(false);
  const [allLetters, setAllLetters] = useState([]);
  const [currentLetter, setCurrentLetter] = useState();
  const [showCross, setShowCross] = useState(false);
  const targetLetter = "T";

  /**
   * Generates a random letter excluding the target letter.
   * @returns {string} A random letter
   */
  const generateRandomLetter = () => {
    // List of uppercase letters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      // Convert string to array of letters
      .split("")
      // Filter out the target letter
      .filter((letter) => letter !== targetLetter);
    // Generate a random index within the range of available letters
    const randomIndex = Math.floor(Math.random() * letters.length);
    // Return a randomly selected letter
    return letters[randomIndex];
  };

  /**
   * Generates an array of random letters of a specified length.
   * @param {number} length - The length of the array
   * @returns {string[]} An array of random letters
   */
  const generateRandomArray = (length) => {
    return Array.from({ length }, () => generateRandomLetter());
  };

  /**
   * Inserts the target letter at a random position within the array.
   * @param {string[]} arr - The array in which to insert the target letter
   * @returns {string[]} The modified array with the target letter inserted
   */
  const placeT = (arr) => {
    // Minimum index to avoid the first element
    const minIndex = 5;
    // Maximum index to avoid the last element
    const maxIndex = arr.length - minIndex;
    // Generate a random index within the specified range
    const index =
      Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    // Create a copy of the original array
    const newArray = [...arr];
    // Insert the target letter at the random index
    newArray.splice(index, 0, targetLetter);
    // Return the modified array
    return newArray;
  };

  /**
   * Handles the keydown event during the test.
   * @param {Event} event - The keydown event
   */
  const handleKeyDown = (event) => {
    if (listeningToInput) {
      // Calculate user response time
      const userResponseTime = performance.now() - startTime;
      // Update reaction time state
      setReactionTime(userResponseTime);
      // Stop listening for input
      setListeningToInput(false);
    }
    // Increment click count
    setClickCount((prev) => prev + 1);
  };

  /**
   * Initializes the test when the component mounts.
   */
  useEffect(() => {
    if (allLetters.length === 0) {
      // Generate random array and insert target letter
      setAllLetters(placeT(generateRandomArray(39)));
    }
  }, []);

  /**
   * Updates the test state based on the current index and test conditions.
   */
  useEffect(() => {
    if (testActive && showCross && currentIndex === 0) {
      // Display cross symbol at the start of the test
      setCurrentLetter("+");
      // Hide cross symbol after 2 seconds
      setTimeout(() => {
        setShowCross(false);
      }, 2000);
    }
    if (testActive && !showCross && currentIndex < allLetters.length) {
      // Display next letter after a brief pause
      setTimeout(() => {
        setCurrentLetter("");
        setTimeout(() => {
          showNextLetter();
        }, 50); // Pause between letters
      }, 100); // Time letter is shown
    } else if (testActive && currentIndex === allLetters.length) {
      // End of test, reset states and show tutorial
      setCurrentLetter("");
      setTimeout(() => {
        setListeningToInput(false);
        setTestActive(false);
        setTestFinished(true);
        setCurrentIndex(0);
        setShowTutorial(true);
      }, 2000);
    }
  }, [currentIndex, testActive, allLetters.length, showCross]);

  /**
   * Starts the test.
   */
  const startTest = () => {
    // Initialize test parameters
    setShowCross(true);
    setTestActive(true);
    setTestFinished(false);
    setShowTutorial(false);
    setClickCount(0);
  };

  /**
   * Displays the next letter in the sequence.
   */
  const showNextLetter = () => {
    // Retrieve the current letter
    const thisLetter = allLetters[currentIndex];
    // Display the current letter
    setCurrentLetter(allLetters[currentIndex]);
    if (currentIndex < allLetters.length) {
      // Enable input listening if the target letter is shown
      if (thisLetter === targetLetter) {
        setListeningToInput(true);
        // Record start time for reaction time calculation
        setStartTime(performance.now());
      }
    }
    // Move to the next index
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {testActive && (
        <div className="flex h-64 justify-center items-center text-9xl">
          {testActive && currentIndex < allLetters.length ? currentLetter : ""}
        </div>
      )}

      {testActive && (
        <button
          className="bg-[#19b394] hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded w-50"
          onClick={handleKeyDown}
        >
          Spied šeit
        </button>
      )}

      {!testActive && (
        <>
          <button
            className="bg-[#19b394] hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded w-50"
            disabled={listeningToInput}
            onClick={startTest}
          >
            {currentTest === 1 ? "Sākt izmēģinājuma testu" : "Sākt testu"}
          </button>
        </>
      )}
    </div>
  );
};

export default Test;
