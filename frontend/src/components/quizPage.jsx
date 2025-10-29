import React from "react";
import { quiz } from "../assets/quizQuestions";
import { useState } from "react";
const QuizPage = ({theme}) => {
  // we're gonna render all the questions into another array
  const [optionChosen,setOptions]=useState([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
  const quizQuestions = quiz.map((individual_question,questionindex) => {
    let hiddentrue="hidden";
    if(optionChosen[questionindex]==-1){
        hiddentrue="";
    }
    return <div className="question_div my-6 max-w-[50vw]">
        <h1 className="text-md font-semibold mb-4">{individual_question.question}</h1>
        <div className="grid grid-cols-2 gap-2">
          {individual_question.options.map((option, index) => (
            <label
              key={index}
              id={"question"+ String(questionindex) }
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 hover:text-black transition-all"
            >
              <input
                type="radio"
                onClick={()=>{ let newOptions=[...optionChosen];
                    newOptions[questionindex]=option.value;
                    setOptions(newOptions);}}
                name={"question"+String(questionindex)}
                value={option.value}
                className="accent-pink-400"
              />
              {option.text}
            </label>
          ))}
        </div>
        <span className={`text-red-400 ${hiddentrue}`}>Choose an option</span>
      </div>;
  });
  const handleSubmit=()=>{
    // check if every question has been checked or not
    let alldone=1;
    for(let i=0;i<10;i++){
        if(optionChosen[i]==-1){
            alldone=0;
        }else{
        }
    } 
    if(alldone==1){
        // we can calculate result;
        const albumCount = new Map([
            ["Reputation", 0],
            ["Red", 0],
            ["1989", 0],
            ["Lover", 0],
            ["Folklore", 0],
            ["Evermore", 0],
            ["Midnights", 0],
            ["Speak Now", 0],
            ["Fearless", 0],
            ["Taylor Swift", 0],
        ]);
        for (let i = 0; i < optionChosen.length; i++) {
            const album = optionChosen[i];
            if (albumCount.has(album)) {
                albumCount.set(album, albumCount.get(album) + 1);
            }
        }

        // Find album with max votes
        let maxAlbum = '';
        let maxCount = 0;

        for (const [album, count] of albumCount.entries()) {
            if (count > maxCount) {
                maxCount = count;
                maxAlbum = album;
            }
        }

        alert(`Your fav album is ${maxAlbum}`);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center bg-no-repeat bg-cover" style={{backgroundImage:`url("${theme.bg_url}")`}}>
      {quizQuestions}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizPage;
