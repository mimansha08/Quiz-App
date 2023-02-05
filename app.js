const STATE = {
    UNATTEMTED: "unattempted",
    OPENED: "opened",
    ATTEMPTED: "attempted"
  }
  const Model = function(){
    var current=0;
    const questions = [{
        text: "What is Harry Potter's middle name? ",
        options: ["Albus","James","Granger","Sirius"],
        answer: 1
      }, {
        text: "What is the other dimension in Stranger Things called?",
        options: ["The Back To Front", "The Inside Out", "The Upside Down", "The Topsy Turvy"],
        answer: 2
      },
      {
        text: "What is the original language in which Squid Game is made?",
        options: ["Korean","Englilsh","Chinese","French"],
        answer: 0
      },
      {
        text: "Which one is not a character of F.R.I.E.N.D.S?",
        options: ["Monica","chandler","Joey","Steve"],
        answer: 3
      },
      {
        text: "Who plays the role of Guddu Pandit in Mirzapur",
        options: ["Divyendu Sharma","Vikrant Massey","Ali Fazal","Pankaj Tripathi"],
        answer: 2
      },
      {
        text: "'Gajab beizzati hai' dialouge is from which series",
        options: ["Khaaki","Panchayat","sacred Games","Gullak"],
        answer: 1
      },
      {
        text: "What is not a TVF series?",
        options: ["Kota Factory","Flames","Taaza Khabar","College Romance"],
        answer: 2
      },
      {
        text: "what is the monster in 'Wednesday' called?",
        options: ["Hyde","Demogorgan","Mind Flayer","voldemort"],
        answer: 0
      },
      {
        text: "What reminds you of series 'Dark'?",
        options: ["Friends Don't Lie","Prometheus","Red Light Green Light","A glitch in the matrix"],
        answer: 3
      },
      {
        text: "What is not a character of any series?",
        options: ["Clay","February","Eleven","wednesday"],
        answer: 1
      }
    ];
    const questionStates = [];
    questions.forEach( question => {
      questionStates.push({
        state: STATE.UNATTEMTED,
        response: undefined
      })
    })

    const returnobj={
        getQuestion: (idx)=>{
            return questions[idx];
        },

        changeqState: (idx,newState)=>{
            questionStates[idx].state=newState;
        },

        getState: (idx)=>{
            return questionStates[idx];
        },

        getQuestionStates: ()=>{
            return questionStates.slice(0);
        },

        setCurrent: (idx)=>{
            current=idx;
        },

        getCurrentIdx: ()=>current,

        getNext: ()=>{
            if(current+1<questions.length)
            {   current++;
                return questions[current];
            }

            return null;
        },

        markAnswer: (qidx,oidx)=>{
            questionStates[qidx].response=oidx;
            questionStates[qidx].state=STATE.ATTEMPTED;
        },
         
        calcScore: ()=>{
            let ans=0;
            let incorrect=0;
            questions.forEach((question,idx)=>{
                if(questionStates[idx].state==STATE.ATTEMPTED){
                    if(question.answer===questionStates[idx].response){
                        ans++;
                    }
                    else{
                        incorrect++;
                    }
                }
            })
            
            return {
                correctAns : ans,
                inCorrectAns : incorrect,
                percentage : (ans/questions.length)*100
            }
        }
    }

    return returnobj;
  }

const View=()=>{
   const returnObject={
    displayQuestion: (question,qidx,oidx)=>{
        document.querySelector(".number").innerHTML=`Question ${qidx+1}`;
        document.querySelector(".text").innerHTML=question.text;
        const getOptionHtml=(option,idx)=>{
          return `
            <div class="option ${oidx===idx?"selected":""}" onclick="app.onOptionClick(${qidx},${idx})">
                ${option}
            </div>
          `
        }
        document.querySelector("#play-area .options").innerHTML=question.options.map(getOptionHtml).join("");
    },

    displayQuestionsState: (questionStates)=>{
        const getQuestionBox=(qstate,idx)=>{
            const html=`
                <div class="questionState ${qstate.state}" onclick="app.onQuestionClick(${idx})" >
                    ${idx+1}
                </div>
            `
            return html;
        }
        document.querySelector("#play-area .states").innerHTML=questionStates.map(getQuestionBox).join("");
    },

    displayResult: (result)=>{
      document.getElementById("play-area").style.display="none";
      document.getElementById("result-area").style.display="flex";
      document.getElementById("submit-btn").style.display="none";
      document.querySelector("#result-area .score").innerHTML=`SCORE: ${result.correctAns}`;
      document.querySelector("#result-area .percentage").innerHTML=`PERCENTAGE: ${result.percentage}`;
    }
   } 

   return returnObject;
}

const App=()=>{
  let model=Model();
  let view= View();
  const openQuestion=(idx)=>{
    model.setCurrent(idx);
    if(model.getState(idx).state===STATE.UNATTEMTED){
      model.changeqState(idx,STATE.OPENED);
    }
    view.displayQuestion(model.getQuestion(idx),idx,model.getState(idx).response);
  }
  openQuestion(0);
  const refreshQState=()=>view.displayQuestionsState(model.getQuestionStates());
  refreshQState();
  document.getElementById("next-btn").addEventListener("click",()=>{
      const next=model.getNext();
      if(next){
        openQuestion(model.getCurrentIdx());
        refreshQState();
      }
  })

  document.getElementById("submit-btn").addEventListener("click",()=>{
    const result= model.calcScore();
    view.displayResult(result);
   });


  const returnobj={
   onQuestionClick: (idx)=>{
    openQuestion(idx);
    refreshQState();
   },

   refreshQState: refreshQState,
   onOptionClick: (qidx,oidx)=>{
      model.markAnswer(qidx,oidx);
      openQuestion(model.getCurrentIdx());
      refreshQState();
   },

   
  }

  return returnobj;
}

const app=App();
