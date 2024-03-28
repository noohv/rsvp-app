"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/initSupabase";
import dynamic from "next/dynamic";
import Test from "./singleTest";
import Tutorial from "./tuto";
import Participant from "./Participant";
import Result from "./Result";

const SurveyMy = dynamic(() => import("./survey"), {
  ssr: false,
});

function Home() {
  const [phase, setPhase] = useState("participant");
  const [showTutorial, setShowTutorial] = useState(true);
  const [reactionTime, setReactionTime] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTest, setCurrentTest] = useState(0);
  const [order, setOrder] = useState([1, 2]);
  const [testFinished, setTestFinished] = useState(false);
  const [data, setData] = useState({
    survey_answers: null,
    test1: {
      result: null,
      clickCount: 0,
    },
    test2: {
      result: null,
      clickCount: 0,
    },
  });

  const saveData = async (e) => {
    const { dat, error } = await supabase.from("data").insert([data]);
    if (error == null) {
      handleReset();
    } else {
      console.error(error);
    }
  };

  const handleReset = () => {
    setPhase("finished");
    setData({
      survey_answers: null,
      test1: {
        result: null,
        clickCount: 0,
      },
      test2: {
        result: null,
        clickCount: 0,
      },
    });
    setReactionTime(null);
    setCurrentIndex(0);
    setCurrentTest(0);
    setShowTutorial(true);
  };

  useEffect(() => {
    setCurrentTest(order[currentIndex]);

    if (testFinished) {
      if (currentIndex < order.length) {
        setData({
          ...data,
          [`test${order[currentIndex]}`]: {
            result: reactionTime,
            clickCount: clickCount,
          },
        });
        setReactionTime(null);
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTestFinished(false);
    }
    if (currentIndex == 2 && !testFinished) {
      setPhase("save");
      console.log(JSON.stringify(data, null, 3));
    }
  }, [reactionTime, order, testFinished]);

  const renderComponent = () => {
    switch (phase) {
      case "participant":
        return (
          <Participant setPhase={setPhase} data={data} setData={setData} />
        );

      case "survey":
        return <SurveyMy setPhase={setPhase} data={data} setData={setData} />;

      case "test":
        return (
          !testFinished && (
            <>
              {showTutorial && <Tutorial currentIndex={currentIndex} />}
              {currentTest === 1 && (
                <>
                  <Test
                    setReactionTime={setReactionTime}
                    setTestFinished={setTestFinished}
                    setShowTutorial={setShowTutorial}
                    setClickCount={setClickCount}
                  />
                </>
              )}

              {currentTest === 2 && (
                <>
                  <Test
                    setReactionTime={setReactionTime}
                    setTestFinished={setTestFinished}
                    setShowTutorial={setShowTutorial}
                    setClickCount={setClickCount}
                  />
                </>
              )}
            </>
          )
        );

      case "save":
        return (
          <>
            <Result data={data} order={order} />
            <button
              className="bg-[#19b394] hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded w-50"
              onClick={saveData}
            >
              Saglabāt
            </button>
          </>
        );

      case "finished":
        return <div>Paldies par dalību!</div>;
      default:
        return (
          <Participant setPhase={setPhase} data={data} setData={setData} />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {renderComponent()}
    </div>
  );
}

export default Home;
