const theme = localStorage.getItem("theme");
if (theme) document.body.classList.add(theme);

let score = 0;
let correctCount = 0;
let time = 0;
let timerInterval;
let usedQuestions = [];

/* ===== BANK SOAL (CONTOH 3, NANTI KAMU TAMBAH SAMPAI 30) ===== */
const questions = [
  {
    passage: "Seni kriya merupakan cabang seni rupa yang menekankan keterampilan tangan dan fungsi.",
    question: "Apa fokus utama dari seni kriya?",
    options: [
      "Keindahan digital",
      "Keterampilan tangan",
      "Gerak tari",
      "Nada dan irama"
    ],
    answer: 1
  },
  {
    passage: "Anyaman adalah salah satu contoh seni kriya yang banyak ditemukan di Indonesia.",
    question: "Bahan yang umum digunakan dalam seni anyaman adalah …",
    options: [
      "Plastik dan kaca",
      "Bambu dan rotan",
      "Besi dan baja",
      "Tanah liat"
    ],
    answer: 1
  },
  {
    passage: "Seni kriya tidak hanya memiliki nilai estetika tetapi juga nilai fungsi.",
    question: "Nilai fungsi dalam seni kriya berarti …",
    options: [
      "Hanya untuk dipajang",
      "Memiliki kegunaan",
      "Tidak boleh digunakan",
      "Bersifat abstrak"
    ],
    answer: 1
  }
];

/* ===== TIMER ===== */
function startTimer() {
  time = 0;
  document.getElementById("timer").innerText = "Waktu: 0";
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").innerText = "Waktu: " + time;
  }, 1000);
}

/* ===== AMBIL SOAL ACAK YANG BELUM DIPAKAI ===== */
function getRandomQuestion() {
  if (usedQuestions.length === questions.length) {
    usedQuestions = [];
  }

  let index;
  do {
    index = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(index));

  usedQuestions.push(index);
  return questions[index];
}

let currentQuestion;

/* ===== TAMPILKAN SOAL ===== */
function loadQuestion() {
  startTimer();
  currentQuestion = getRandomQuestion();

  document.getElementById("passage").innerText = currentQuestion.passage;
  document.getElementById("question").innerText = currentQuestion.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  currentQuestion.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

/* ===== CEK JAWABAN ===== */
function checkAnswer(selected) {
  clearInterval(timerInterval);

  if (selected === currentQuestion.answer) {
    correctCount++;
    score += time <= 180 ? 25 : 15;
  }

  if (correctCount >= 10) {
    localStorage.setItem("finalScore", score);
    location.href = "result.html";
  } else {
    loadQuestion();
  }
}

/* ===== MULAI ===== */
loadQuestion();
