const theme = localStorage.getItem("theme");
if (theme) document.body.classList.add(theme);

/* =========================
   SET TIMER GLOBAL REAL TIME
========================= */

// kalau belum ada waktu mulai, set sekarang
if (!localStorage.getItem("startTime")) {
localStorage.setItem("startTime", Date.now());
}

const TOTAL_TIME = 30; // 30 detik

let benar = 0;
let dijawab = 0;
let skor = 0;
let used = [];

/* =========================
   BANK 30 SOAL
========================= */

const questions = [];

for (let i = 1; i <= 30; i++) {
questions.push({
passage: "Seni kriya ke-" + i + " menjelaskan bahwa karya kriya memiliki nilai estetika dan fungsi praktis dalam kehidupan masyarakat serta mencerminkan identitas budaya.",
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

/* =========================
   TIMER GLOBAL BERDASARKAN REAL TIME
========================= */

function updateTimer() {

let startTime = parseInt(localStorage.getItem("startTime"));
let now = Date.now();
let elapsed = Math.floor((now - startTime) / 1000);
let remaining = TOTAL_TIME - elapsed;

document.getElementById("timer").innerText = remaining > 0 ? remaining : 0;

if (remaining <= 0) {
endQuiz();
}
}

setInterval(updateTimer, 200);

/* =========================
   ACAK SOAL
========================= */

function randomQ() {

if (used.length === questions.length) used = [];

let i;
do {
i = Math.floor(Math.random() * questions.length);
} while (used.includes(i));

used.push(i);
return questions[i];
}

/* =========================
   LOAD SOAL
========================= */

function loadQuestion() {

let startTime = parseInt(localStorage.getItem("startTime"));
let now = Date.now();
let elapsed = Math.floor((now - startTime) / 1000);

if (elapsed >= TOTAL_TIME) {
endQuiz();
return;
}

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

/* =========================
   AKHIR KUIS
========================= */

function endQuiz() {

localStorage.removeItem("startTime"); // reset untuk main lagi

localStorage.setItem("benar", benar);
localStorage.setItem("dijawab", dijawab);
localStorage.setItem("skor", skor);

location.href = "result.html";
}

/* =========================
   MULAI
========================= */

loadQuestion();
