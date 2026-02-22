const theme = localStorage.getItem("theme");
if(theme) document.body.classList.add(theme);

let waktu = 30;          // mulai dari 30
let timer = null;        // supaya tidak double
let benar = 0;
let dijawab = 0;
let skor = 0;
let used = [];

/* =========================
   BANK 30 SOAL
========================= */
const questions = [];

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

/* =========================
   TIMER GLOBAL (HANYA SEKALI)
========================= */
function startTimer(){

// kalau sudah ada timer jangan buat lagi
if(timer !== null) return;

document.getElementById("timer").innerText = waktu;

timer = setInterval(() => {

waktu--;
document.getElementById("timer").innerText = waktu;

if(waktu <= 0){
clearInterval(timer);
endQuiz();
}

},1000);

}

/* =========================
   ACAK SOAL TANPA ULANG
========================= */
function randomQ(){

if(used.length === questions.length){
used = [];
}

let i;
do{
i = Math.floor(Math.random()*questions.length);
}while(used.includes(i));

used.push(i);
return questions[i];
}

/* =========================
   LOAD SOAL (TIDAK SENTUH TIMER)
========================= */
function load(){

let q = randomQ();

document.getElementById("passage").innerText = q.passage;
document.getElementById("question").innerText = q.question;

let opt = document.getElementById("options");
opt.innerHTML = "";

q.options.forEach((o,i)=>{
let b = document.createElement("button");
b.innerText = o;

b.onclick = () => {

dijawab++;

if(i === q.answer){
benar++;
skor += 10;
}

load(); // ganti soal tanpa reset timer

};

opt.appendChild(b);
});

}

/* =========================
   AKHIR KUIS
========================= */
function endQuiz(){

localStorage.setItem("benar", benar);
localStorage.setItem("dijawab", dijawab);
localStorage.setItem("skor", skor);

location.href="result.html";
}

/* =========================
   MULAI
========================= */
startTimer();  // timer dipanggil SEKALI
load();        // soal pertama
