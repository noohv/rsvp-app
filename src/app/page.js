"use client"
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/initSupabase'
import dynamic from "next/dynamic"
import Test from './singleTest'
import Tutorial from './tuto'

const SurveyMy = dynamic(() => import("./survey"), {
  ssr: false,
})

function Home() {
  const [phase, setPhase] = useState("survey")
  const [showTutorial, setShowTutorial] = useState(true)
  const [reactionTime, setReactionTime] = useState(null)
  const [clickCount, setClickCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTest, setCurrentTest] = useState(0)
	const [order, setOrder] = useState([])
  const [testFinished, setTestFinished] = useState(false)
  const [data, setData] = useState({
    survey_answers: null,
    test1: {
      result: null,
      clickCount: 0
    },
    test2: {
      result: null,
      clickCount: 0
    },
    test3: {
      result: null,
      clickCount: 0
    }
  })

  const saveData = async (e) => {
    const { dat, error } = await supabase
    .from('data')
    .insert([
      data
    ])
    if(error == null) {
      handleReset()
    }
    else {
      console.error(error)
    }
  }

  const displayResults = order.map((number, index) => (
    <li key={index + 1}>
      {index + 1}. tests: {data[`test${number}`].result != null ? `${Math.round(data[`test${number}`].result)} ms (milisekundes)` : "Nav fiksēts"}
    </li>
  ))

  const handleReset = () => {
    setPhase("finished")
    setData({
      survey_answers: null,
      test1: {
        result: null,
        clickCount: 0
      },
      test2: {
        result: null,
        clickCount: 0
      },
      test3: {
        result: null,
        clickCount: 0
      }
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

    if(testFinished) {
      if(currentIndex < order.length) {
        setData({
          ...data,
          [`test${order[currentIndex]}`]: {
            result: reactionTime,
            clickCount: clickCount
          }
        })
        setReactionTime(null)
      }
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setTestFinished(false)
    }
    if(currentIndex == 3 && !testFinished) {
      setPhase("save")
      console.log(JSON.stringify(data, null, 3))
    }
    
  }, [reactionTime, order, testFinished])

	return (
		<div className='flex flex-col min-h-screen justify-center items-center'>
      {phase === "survey" &&
        <>
          <SurveyMy setPhase={setPhase} data={data} setData={setData}/>
        </>
      }

      {(phase === "test" && !testFinished) &&
        <>

          {showTutorial &&
            <Tutorial currentIndex={currentIndex}/>
          }
          {currentTest == 1 && 
            <Test 
              testNumber={1}
              setReactionTime={setReactionTime} 
              setTestFinished={setTestFinished} 
              setShowTutorial={setShowTutorial}
              setClickCount={setClickCount}
            />
          }

          {currentTest == 2 && 
            <Test 
              testNumber={2} 
              setReactionTime={setReactionTime} 
              setTestFinished={setTestFinished} 
              setShowTutorial={setShowTutorial}
              setClickCount={setClickCount}
            />
          }

          {currentTest == 3 && 
            <Test 
              testNumber={3} 
              setReactionTime={setReactionTime} 
              setTestFinished={setTestFinished} 
              setShowTutorial={setShowTutorial}
              setClickCount={setClickCount}
            />
          }
        </>
      }

      {phase === "save" && 
        (
          <>
            <div className='m-5'>
              Jūsu reakciju testu rezultāti: 
              <ul className='list-disc'>
                {displayResults}
              </ul>

            </div>
            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded w-50" onClick={saveData}>
              Saglabāt
            </button>
          </>
        )
      }

      {phase === "finished" && 
        <div>
          Paldies par dalību!
        </div>
      }
		</div>
	)
}

export default Home

