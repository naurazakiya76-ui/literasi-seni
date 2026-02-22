alert("JS Terhubung");

const questions = [
{
passage:"Seni kriya adalah karya seni rupa terapan yang mengutamakan keterampilan tangan dan nilai fungsi.",
question:"Apa ciri utama seni kriya?",
options:["Hanya pajangan","Mengutamakan fungsi","Digital","Tanpa nilai guna"],
answer:1
},
{
passage:"Batik diakui UNESCO sebagai warisan budaya Indonesia.",
question:"Mengapa batik diakui dunia?",
options:["Karena mahal","Karena unik dan bernilai budaya","Karena tren","Karena modern"],
answer:1
},
{
passage:"Keramik dibuat dari tanah liat lalu dibakar hingga mengeras.",
question:"Tujuan pembakaran adalah...",
options:["Mewarnai","Menghias","Mengeraskan","Mendinginkan"],
answer:2
}
];

let score = 0;
let timeLeft = 30;
let timerInterval;
let currentQuestion;

// ================= START QUIZ =================
function startQuiz(){

document.getElementById("startScreen").classList.remove("active");
document.getElementById("quizScreen").classList.add("active");
document.querySelector(".timer-wrapper").classList.add("active");

showQuestion();
startTimer();
}

// ================= SHOW QUESTION =================
function showQuestion(){

// ambil soal random
currentQuestion = questions[Math.floor(Math.random()*questions.length)];

document.getElementById("passage").textContent = currentQuestion.passage;
document.getElementById("question").textContent = currentQuestion.question;

const optionsDiv = document.getElementById("options");
optionsDiv.innerHTML="";

currentQuestion.options.forEach(function(option,index){
const btn = document.createElement("button");
btn.textContent = option;
btn.onclick = function(){
selectAnswer(index);
};
optionsDiv.appendChild(btn);
});
}

// ================= SELECT ANSWER =================
function selectAnswer(index){

if(index === currentQuestion.answer){
score++;
}

showQuestion(); // langsung tampil soal baru
}

// ================= TIMER =================
function startTimer(){

const circle = document.getElementById("progressCircle");
const total = 30;
const circumference = 283;

timerInterval = setInterval(function(){

timeLeft--;
document.getElementById("timerText").textContent = timeLeft;

let offset = circumference - (timeLeft/total)*circumference;
circle.style.strokeDashoffset = offset;

if(timeLeft <= 0){
finishQuiz();
}

},1000);
}

// ================= FINISH =================
function finishQuiz(){

clearInterval(timerInterval);

document.getElementById("quizScreen").classList.remove("active");
document.querySelector(".timer-wrapper").classList.remove("active");
document.getElementById("resultScreen").classList.add("active");

document.getElementById("finalScore").textContent =
"Skor Kamu: " + score;
}

// ================= RESTART =================
function restartQuiz(){
location.reload();
}
