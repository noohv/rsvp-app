"use client"
import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic"
import Test from './singleTest'
import Tutorial from './tutorial'

const SurveyMy = dynamic(() => import("./survey"), {
  ssr: false,
})

function Home() {
  const [phase, setPhase] = useState("survey")
  const [showTutorial, setShowTutorial] = useState(true)
  const [reactionTime, setReactionTime] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTest, setCurrentTest] = useState(0)
	const [order, setOrder] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [data, setData] = useState({
    surveyAnswers: null,
    result1: null,
    result2: null,
    result3: null
  })

  const handleReset = (e) => {
    setPhase("survey")
    setData({
      surveyAnswers: null,
      result1: null,
      result2: null,
      result3: null
    })
    shuffleOrder()
    setReactionTime(null)
    setCurrentIndex(0)
    setCurrentTest(0)
    setShowTutorial(true)
  }

	const shuffleOrder = () => {
		setOrder([1,2,3].sort(() => .5 - Math.random()))
	}

  useEffect(() => {
    shuffleOrder()
  },[])

	useEffect(() => {
    setCurrentTest(order[currentIndex])

    if(isActive) {
      if(currentIndex < order.length) {
        setData({...data, [`result${order[currentIndex]}`]: reactionTime})
        setReactionTime(null)
      }
      setIsActive(false)
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    if(currentIndex == 3 && !isActive) {
      setPhase("save")
    }
    
  }, [reactionTime, order, isActive])

	return (
		<div className='flex flex-col min-h-screen justify-center items-center'>
      {phase === "survey" &&
        <>
          <SurveyMy setPhase={setPhase} data={data} setData={setData}/>
        </>
      }

      {phase === "test" &&
        <>

          {showTutorial &&
            <Tutorial currentIndex={currentIndex}/>
          }
          {currentTest == 1 && 
            <Test testNumber={1} setReactionTime={setReactionTime} setIsActive={setIsActive} setShowTutorial={setShowTutorial}/>
          }

          {currentTest == 2 && 
            <Test testNumber={2} setReactionTime={setReactionTime} setIsActive={setIsActive} setShowTutorial={setShowTutorial}/>
          }

          {currentTest == 3 && 
            <Test testNumber={3} setReactionTime={setReactionTime} setIsActive={setIsActive} setShowTutorial={setShowTutorial}/>
          }
        </>
      }

      {phase === "save" && 
        (
          <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50" onClick={handleReset}>
              Uz sākumu
            </button>

            <pre>
              {JSON.stringify(data)}
            </pre>
          </>
        )
      }


		</div>
	)
}

export default Home

