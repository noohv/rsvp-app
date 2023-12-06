"use client"
import React from 'react'
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui';


const surveyJson = {
  completeText: "Turpināt",
  title: "RSVP Reakcijas tests",
  description: "Lūdzu sniedziet informāciju par sevi!",
  elements: [{
    name: "dzimums",
    title: "Jūsu dzimums:",
    isRequired: true,
    type: "radiogroup",
    choices: ["Vīrietis", "Sieviete", "Cits"]
  }, 
  {
    name: "vecums",
    title: "Jūsu vecums:",
    isRequired: true,
    type: "text"
  },
  {
    name: "izglitibas_joma",
    title: "Jūsu izglītības joma",
    type: "radiogroup",
    isRequired: true,
    choices: [
      {
        value: "skolens",
        text: "Skolēns"
      },
      {
        value: "socialas_zinatnes",
        text: "Sociālās zinātnes"
      },
      {
        value: "dabas_zinatnes",
        text: "Dabas zinātnes"
      },
      {
        value: "inzenierzinatnes",
        text: "Inženierzinātnes"
      },
      {
        value: "humanitaras",
        text: "Humanitārās zinātnes"
      },
      {
        value: "veselibas_aprupe",
        text: "Veselības aprūpe"
      },
      {
        value: "pakalpojumi",
        text: "Pakalpojumi"
      },
      {
        value: "izglitiba",
        text: "Izglītība"
      },
      {
        value: "maksla",
        text: "Māksla"
      }
    ],
    showOtherItem: true,
    otherPlaceholder: {
      default: "",
    },
    otherText: {
      default: "Cits",
    }
  },
  {
    name: "nodarbosanas",
    title: "Jūsu nodarbošanās",
    type: "radiogroup",
    isRequired: true,
    choices: [
      {
        value: "vaditajs",
        text: "Augstākā vai vidējā līmeņa vadītājs"
      },
      {
        value: "specialists",
        text: "Speciālists, ierēdnis"
      },
      {
        value: "stradnieks",
        text: "Strādnieks, strādā fizisku darbu"
      },
      {
        value: "zemnieks",
        text: "Zemnieks (ir sava zemnieku saimniecība)"
      },
      {
        value: "uznemejs",
        text: "Ir savs uzņēmums, individuālais darbs"
      },
      {
        value: "students",
        text: "Skolēns, students"
      },
      {
        value: "majsaimniece",
        text: "Mājsaimniece (-ks), bērna kopšanas atvaļinājums"
      },
      {
        value: "bezdarbnieks",
        text: "Bezdarbnieks"
      }
    ],
    showOtherItem: true,
    otherPlaceholder: {
      default: "",
    },
    otherText: {
      default: "Cits",
    }
  },
  {
    name: "roka",
    title: "Jūs esat:",
    type: "radiogroup",
    isRequired: true,
    choices: [
      {
        value: "right_handed",
        text: "Labrocis"
      },
      {
        value: "left_handed",
        text: "Kreilis"
      }
    ]
  },
  {
    type: "checkbox",
    name: "hobiji",
    title: "Kādi ir jūsu hobiji?",
    description: "Iespējamas vairākas atbildes",
    isRequired: true,
    choices: [
      {
        value: "speles",
        text: "Videospeles, datorspēles"
      },
      {
        value: "ara_aktivitates",
        text: "Āra aktivitātes (makšķerēšana, medības, pārgājieni, laivošana u.c)"
      },
      {
        value: "sports",
        text: "Sports (sporta spēles, skriešana, riteņbraukšana u.c.)"
      },
      {
        value: "galda_speles",
        text: "Galda, āra spēles, puzles u.c."
      },
      {
        value: "dejosana",
        text: "Dejošana"
      },
      {
        value: "muzicesana",
        text: "Muzicēšana (spēlēt mūzikas instrumentus)"
      },
      {
        value: "vizuala_maksla",
        text: "Vizuālā māksla (zīmēšana, gleznošana, tēlniecība u.c)"
      }
    ],
    showOtherItem: true,
    otherPlaceholder: {
      default: "",
    },
    otherText: {
      default: "Cits",
    },
  },
  {
    visibleIf: "{hobiji} contains 'speles'",
    type: "radiogroup",
    name: "speles",
    title: "Cik bieži spēlējat datorspēles?",
    isRequired: true,
    choices: [
      {
        value: "maz",
        text: "Maz"
      },
      {
        value: "daudz",
        text: "Daudz"
      },
    ]
  }

]
};


const SurveyMy = ({setPhase, data, setData}) => {
  const survey = new Model(surveyJson)
  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3))
    sender.showCompletedPage = false
    setPhase("test")
    setData({...data, surveyAnswers: sender.data})

  })

  return (
    <Survey model={survey} />
  )
}

export default SurveyMy