const theme = localStorage.getItem("theme");
if (theme) document.body.classList.add(theme);

/* =======================
   VARIABEL GLOBAL
======================= */
let waktu = 30;
let benar = 0;
let dijawab = 0;
let skor = 0;
let used = [];
let timerStarted = false; // kunci agar tidak dobel

/* =======================
   BANK 30 SOAL
======================= */
const questions = [];

for (let i = 1; i <= 30; i++) {
questions.push({
passage: "Seni kriya ke-" + i + " menjelaskan bahwa karya kriya memiliki nilai estetika sekaligus fungsi praktis dalam kehidupan masyarakat. Proses pembuatannya membutuhkan ketelitian dan pemahaman budaya lokal.",
question: "Apa karakter utama seni kriya berdasarkan bacaan tersebut?",
options: [
"Mengutamakan fungsi dan estetika",
"Hanya untuk dekorasi",
"Tidak memiliki nilai budaya",
"Produk pabrik modern"
],
answer: 0
});
}

/* =======================
   TIMER GLOBAL SEKALI SAJA
======================= */
function startTimer() {

if (timerStarted) return; // cegah dobel
timerStarted = true;

document.getElementById("timer").innerText = waktu;

const countdown = setInterval(() => {

waktu--;
document.getElementById("timer").innerText = waktu;

if (waktu <= 0) {
clearInterval(countdown);
endQuiz();
}

}, 1000);
}

/* =======================
   ACAK TANPA ULANG
======================= */
function randomQ() {

if (used.length === questions.length) {
used = [];
}

let index;
do {
index = Math.floor(Math.random() * questions.length);
} while (used.includes(index));

used.push(index);
return questions[index];
}

/* =======================
   LOAD SOAL
======================= */
function loadQuestion() {

let q = randomQ();

document.getElementById("passage").innerText = q.passage;
document.getElementById("question").innerText = q.question;

let opt = document.getElementById("options");
opt.innerHTML = "";

q.options.forEach((text, i) => {

let btn = document.createElement("button");
btn.innerText = text;

btn.onclick = () => {

dijawab++;

if (i === q.answer) {
benar++;
skor += 10;
}

loadQuestion(); // ganti soal TANPA sentuh timer
};

opt.appendChild(btn);
});
}

/* =======================
   AKHIR KUIS
======================= */
function endQuiz() {

localStorage.setItem("benar", benar);
localStorage.setItem("dijawab", dijawab);
localStorage.setItem("skor", skor);

location.href = "result.html";
}

/* =======================
   JALANKAN SEKALI
======================= */
window.onload = function () {
startTimer();
loadQuestion();
};
