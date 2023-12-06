"use client"
import React from 'react'
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui';


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
        text: ""
      }
    ],
    showOtherItem: true,
    otherPlaceholder: {
      default: "",
    },
    otherText: {
      default: "Cits",
    },
  }

]
};


const SurveyMy = () => {
  const survey = new Model(surveyJson);
  return (
    <Survey model={survey} />
  )
}

export default SurveyMy