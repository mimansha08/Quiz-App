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
const model=Model();
model.changeqState(0,STATE.ATTEMPTED);
model.markAnswer(0,0);
console.log(model.calcScore());
model.changeqState(1,STATE.ATTEMPTED);
model.markAnswer(1,1);
console.log(model.calcScore());

const View=()=>{
   const returnObject={
    displayQuestion: (question)=>{

    },

    displayQuestionsState: (questionStates)=>{

    },

    displayResult: (result)=>{
        
    }
   } 
}