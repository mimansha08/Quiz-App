const STATE = {
    UNATTEMTED: "unattempted",
    OPENED: "opened",
    ATTEMPTED: "attempted"
  }
  const Model = function(){
    var current=0;
    const questions = [{
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      }, {
        text: "What is the capital of India?",
        options: ["Kolkata", "Delhi", "Patna", "Lucknow"],
        answer: 1
      },
      {
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      },
      {
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      },
      {
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      },
      {
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      },
      {
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      },
      {
        text: "What is 2+2?",
        options: ["4","6","5","2"],
        answer: 0
      }];
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
    displayQuestion: (question,idx)=>{
        document.querySelector(".number").innerHTML=`Question ${idx+1}`;
        document.querySelector(".text").innerHTML=question.text;
        const getOptionHtml=(option,idx)=>{
          return `
            <div class="option">
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
        const onButtonClick=()=>{
            console.log(result);  
       }
       document.getElementById("submit-btn").addEventListener("click",onButtonClick);
    }
   } 

   return returnObject;
}

const App=()=>{
  let model=Model();
  let view= View();
  const openQuestion=(idx)=>{
    if(model.getState(idx).state===STATE.UNATTEMTED){
      model.changeqState(idx,STATE.OPENED);
    }
    view.displayQuestion(model.getQuestion(idx),idx);
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
  const returnobj={
   onQuestionClick: (idx)=>{
    openQuestion(idx);
    refreshQState();
   },

   refreshQState: refreshQState

  }

  return returnobj;
}

const app=App();
