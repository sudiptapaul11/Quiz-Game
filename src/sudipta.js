

const startButton = document.querySelector(".start_button");
const infoBox = document.querySelector(".info_box");
const exitButton = document.querySelector(".buttons .quit");
const continueButton = document.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer .timer-sec");
const timeLine = document.querySelector("header .timer_line")
const scoreText = document.querySelector(".result-box .score_text");
const nextButton = document.querySelector(".next-button");
const resultBox = document.querySelector(".result-box");
const restartQuiz = document.querySelector(".replay-button .replay")
const quitQuiz = document.querySelector(".replay-button .end-quit")

let iconCross= '<div class="icon cross"><i class="fas fa-times"></i></div>';
let iconTick=  '<div class="icon tick"><i class="fas fa-check"></i></div>';

let ques_count=0;
let counter;
let timeValue=15;
let widthValue=0;
var score=0;

//If start quiz button clicked
startButton.onclick = () => {
    infoBox.classList.add("activateInfoBox");//show info box
}

//If exit button clicked
exitButton.onclick = () => {
    infoBox.classList.remove("activateInfoBox");//hide info box
}

//If  button clicked
continueButton.onclick = () => {
    infoBox.classList.remove("activateInfoBox");//hide info box
    quizBox.classList.add("activateQuizBox");//show quiz box
    showQuestion(0);
    startTimer(15);
    footerIndex(1);
    startTimerLine(0);
    
    
}



//If next button clicked
nextButton.onclick = () => {
    if(ques_count < questions.length-1){
        ques_count++;
        showQuestion(ques_count);
        footerIndex(ques_count+1);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextButton.style.display = "none";
    }else{
        console.log("questions finished");
        showResultBox();
    }
}



function showQuestion(index){
    const ques_text = document.querySelector(".ques_text");
    
    let ques_tag = '<span>'+questions[index].num+"."+ questions[index].question+ '</span>';
    let option_tag = '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[1]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[2]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[3]+'</span></div>';
    ques_text.innerHTML=ques_tag;
    option_list.innerHTML=option_tag;

    const option = option_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)")
    }
}


function optionSelected(ans){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = ans.textContent;
    let correctAnswer = questions[ques_count].answer ;
    let allOptions = option_list.children.length;
   if (userAnswer == correctAnswer){
        ans.classList.add("correct");
        console.log("right");
        ans.insertAdjacentHTML("beforeend", iconTick);
        score++;
    }else{
        ans.classList.add("incorrect");
        console.log("wrong");
        ans.insertAdjacentHTML("beforeend", iconCross);

        for(let i=0;i<allOptions;i++){
           if( option_list.children[i].textContent==correctAnswer) {
            option_list.children[i].setAttribute("class","option correct");
            option_list.children[i].insertAdjacentHTML("beforeend", iconTick);
           }
    }
}
    for(let i=0;i<allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
   nextButton.style.display = "block";
}

function showResultBox(){
    infoBox.classList.remove("activateInfoBox");
    quizBox.classList.remove("activateQuizBox");
    resultBox.classList.add("activateResultBox");
   
    let scoreResult = score*20;
    scoreText.textContent = scoreResult+"%";
}

restartQuiz.onclick = () =>{
    resultBox.classList.remove("activateResultBox");
    infoBox.classList.add("activateInfoBox");
    ques_count=0;
    score=0;
}

quitQuiz.onclick = () =>{
    resultBox.classList.remove("activateResultBox");
    ques_count=0;
    score=0;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0"+addZero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent = "00";
            if(ques_count < questions.length-1){
                ques_count++;
                showQuestion(ques_count);
                footerIndex(ques_count+1);
                clearInterval(counter);
                startTimer(timeValue);
                clearInterval(counterLine);
                startTimerLine(widthValue);
                nextButton.style.display = "none";
               
            }
           
        }
    }
}



function startTimerLine(time){
    counterLine = setInterval(timer, 30);
    function timer(){
        time = time + 1;
        timeLine.style.width = time + "px";
        
        if(time > 550){
            clearInterval(counterLine);
           
        }
    }
}

function footerIndex(index){
const bottom_ques_counter = document.querySelector(".total_question");
let totalquesCounter =  '<span><p>'+index+'</p><p>/</p><p>'+questions.length+'</p></span>';
bottom_ques_counter.innerHTML=totalquesCounter;

}

