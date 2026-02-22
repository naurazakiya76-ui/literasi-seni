const theme = localStorage.getItem("theme");
if(theme) document.body.classList.add(theme);

let waktu = 30;
let timer;
let benar = 0;
let dijawab = 0;
let skor = 0;
let used = [];

const questions = [];

/* ====== BANK 30 SOAL ====== */
for(let i=1;i<=30;i++){
questions.push({
passage:"Seni kriya ke-"+i+" menjelaskan bahwa karya kriya memiliki nilai estetika sekaligus fungsi praktis dalam kehidupan masyarakat. Proses pembuatannya membutuhkan ketelitian, kesabaran, dan pemahaman budaya lokal.",
question:"Apa karakter utama seni kriya berdasarkan bacaan tersebut?",
options:[
"Mengutamakan fungsi dan estetika",
"Hanya untuk dekorasi",
"Tidak memiliki nilai budaya",
"Produk pabrik modern"
],
answer:0
});
}

/* TIMER GLOBAL */
function startTimer(){
timer=setInterval(()=>{
waktu--;
document.getElementById("timer").innerText=waktu;

if(waktu<=0){
clearInterval(timer);
endQuiz();
}
},1000);
}

/* ACAK SOAL */
function randomQ(){
let i;
do{
i=Math.floor(Math.random()*questions.length);
}while(used.includes(i));
used.push(i);
return questions[i];
}

/* LOAD SOAL */
function load(){
let q = randomQ();

document.getElementById("passage").innerText=q.passage;
document.getElementById("question").innerText=q.question;

let opt=document.getElementById("options");
opt.innerHTML="";

q.options.forEach((o,i)=>{
let b=document.createElement("button");
b.innerText=o;
b.onclick=()=>{
dijawab++;
if(i===q.answer){
benar++;
skor+=10;
}
load();
};
opt.appendChild(b);
});
}

/* AKHIR */
function endQuiz(){
localStorage.setItem("benar", benar);
localStorage.setItem("dijawab", dijawab);
localStorage.setItem("skor", skor);
location.href="result.html";
}

startTimer();
load();
