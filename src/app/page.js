"use client"
import React, { useState, useEffect } from 'react'
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui';
import Test from './singleTest'
// import Survey from './survey'
const surveyJson = {
  elements: [{
    name: "sex",
    title: "Jūsu dzimums:",
    type: "radiogroup",
    choices: ["Vīrietis", "Sieviete", "Cits"]
  }, 
  {
    name: "age",
    title: "Jūsu vecums:",
    type: "text"
  },
  {
    type: "checkbox",
    name: "promoter-features",
    title: {
      default: "Which of the following features do you value the most?",
    },
    description: {
      default: "Please select no more than three features.",
    },
    isRequired: true,
    choices: [
      {
        value: "performance",
        text: "Performance"
      },
      {
        value: "stability",
        text: {
          default: "Stability",
        }
      },
      {
        value: "ui",
        text: {
          default: "User interface",
        }
      },
      {
        value: "complete-functionality",
        text: {
          default: "Complete functionality",
        }
      },
      {
        value: "learning-materials",
        text: {
          default: "Learning materials (documentation, demos, code examples)",
        }
      },
      {
        value: "support",
        text: {
          default: "Quality support",
        }
      }
    ],
    showOtherItem: true,
    otherPlaceholder: {
      default: "Please specify...",
    },
    otherText: {
      default: "Other features",
    },
    colCount: 2,
    maxSelectedChoices: 3
  }

]
};

function Home() {
  const survey = new Model(surveyJson);
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

  const handleReset = (e) => {
    setPhase("user")
    setData({
      age:"",
      gender: "",
      result1: null,
      result2: null,
      result3: null
    })
    shuffleOrder()
    setReactionTime(null)
    setCurrentIndex(0)
    setCurrentTest(0)
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
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsActive(false)
    }
    if(currentIndex == 3 && !isActive) {
      setPhase("save")
    }
    
  }, [reactionTime, order, isActive])
  console.log(data)

	return (
		<>

      {phase === "user" &&
        <>
          <Survey model={survey} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50" onClick={(e) => {setPhase("test")}}>
            Uz testu
          </button>
        </>
      }

      {currentTest == 2 ? !isActive ? "Yes" : "No" : ""}


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


		</>
	)
}

export default Home

