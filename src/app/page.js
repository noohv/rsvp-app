"use client"
import React, { useState, useEffect } from 'react'
import Test from './singleTest'

function Home() {
  const [phase, setPhase] = useState("user")
  const [reactionTime, setReactionTime] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTest, setCurrentTest] = useState(0)
	const [order, setOrder] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [data, setData] = useState({
    age:"",
    gender: "",
    result1: null,
    result2: null,
    result3: null
  })

	const shuffleOrder = () => {
		setOrder([1,2,3].sort(() => .5 - Math.random()))
	}

  useEffect(() => {
    shuffleOrder()
  },[])

	useEffect(() => {
    console.log(currentTest)
    setCurrentTest(order[currentIndex])

    if(currentIndex < order.length && isActive) {
      setData({...data, [`result${order[currentIndex]}`]: reactionTime})
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    if(currentIndex === order.length) {
      setPhase("save")
    }
    
  }, [reactionTime, order, isActive])
  console.log(phase)

	return (
		<>

      {phase === "user" &&
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50" onClick={(e) => {setPhase("test")}}>
            Uz testu
          </button>

      }


      {(phase === "test" && currentTest == 1) &&
        <Test testNumber={1} setReactionTime={setReactionTime} setIsActive={setIsActive}/>
      }

      {(phase === "test" && currentTest == 2) &&
        <Test testNumber={2} setReactionTime={setReactionTime} setIsActive={setIsActive}/>
      }

      {(phase === "test" && currentTest == 3) &&
        <Test testNumber={3} setReactionTime={setReactionTime} setIsActive={setIsActive}/>
      }

      {phase === "save" &&
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50" onClick={(e) => {setPhase("user")}}>
          Uz testu
        </button>
      }
		</>
	)
}

export default Home

