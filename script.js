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
},
{
passage:"Songket adalah kain tradisional yang dihiasi benang emas atau perak dan sering digunakan dalam acara adat.",
question:"Ciri khas utama kain songket adalah...",
options:["Benang emas","Tanpa motif","Warna polos","Dicetak mesin"],
answer:0
},
{
passage:"Seni patung termasuk karya tiga dimensi karena memiliki panjang, lebar, dan tinggi.",
question:"Mengapa patung disebut karya tiga dimensi?",
options:["Karena berwarna","Karena memiliki ruang","Karena datar","Karena dilukis"],
answer:1
},
{
passage:"Keramik dibuat dari tanah liat yang dibentuk lalu dibakar hingga mengeras.",
question:"Proses pembakaran keramik bertujuan untuk...",
options:["Mewarnai","Mengeringkan sementara","Mengeraskan permanen","Menghias"],
answer:2
},
{
passage:"Batik telah diakui UNESCO sebagai warisan budaya Indonesia.",
question:"Pengakuan UNESCO menunjukkan bahwa batik adalah...",
options:["Produk biasa","Warisan budaya dunia","Barang ekspor","Tren sementara"],
answer:1
},
{
passage:"Anyaman rotan sering digunakan untuk membuat kursi dan meja.",
question:"Bahan utama furnitur tersebut adalah...",
options:["Kayu jati","Rotan","Plastik","Besi"],
answer:1
},
{
passage:"Seni kriya termasuk seni rupa terapan karena memiliki nilai fungsi.",
question:"Yang dimaksud seni rupa terapan adalah...",
options:["Hanya untuk dilihat","Memiliki fungsi pakai","Tanpa nilai estetika","Karya digital"],
answer:1
},
{
passage:"Tenun ikat dibuat dengan cara mengikat benang sebelum proses pewarnaan.",
question:"Keunikan tenun ikat terletak pada...",
options:["Motif hasil ikatan","Tanpa warna","Teknik cetak","Digital printing"],
answer:0
},
{
passage:"Topeng tradisional digunakan dalam pertunjukan tari daerah.",
question:"Fungsi utama topeng dalam tari adalah...",
options:["Dekorasi rumah","Properti pertunjukan","Mainan","Hiasan meja"],
answer:1
},
{
passage:"Seni ukir Jepara terkenal karena detail dan kehalusannya.",
question:"Keunggulan ukir Jepara adalah...",
options:["Murah","Detail halus","Berat","Plastik"],
answer:1
},
{
passage:"Kerajinan tangan biasanya diproduksi dalam skala kecil.",
question:"Produksi skala kecil berarti...",
options:["Massal","Terbatas","Industri besar","Robotik"],
answer:1
},
{
passage:"Produk kriya lokal dapat meningkatkan ekonomi masyarakat.",
question:"Dampak ekonomi dari kriya adalah...",
options:["Kerugian","Pengangguran","Peningkatan pendapatan","Kemiskinan"],
answer:2
},
{
passage:"Kaca patri sering ditemukan di bangunan ibadah sebagai hiasan.",
question:"Fungsi kaca patri adalah...",
options:["Penutup biasa","Dekoratif dan simbolis","Mainan","Plastik"],
answer:1
},
{
passage:"Tas rajut dibuat dengan teknik merangkai benang menggunakan jarum khusus.",
question:"Teknik tersebut disebut...",
options:["Menganyam","Merajut","Mengecat","Mengukir"],
answer:1
},
{
passage:"Miniatur rumah adat dibuat sebagai media edukasi budaya.",
question:"Fungsi miniatur tersebut adalah...",
options:["Investasi","Edukasi","Ekspor","Dekorasi biasa"],
answer:1
},
{
passage:"Seni kriya memerlukan keterampilan khusus dan latihan.",
question:"Keterampilan khusus berarti...",
options:["Keahlian tertentu","Sembarangan","Tanpa belajar","Acak"],
answer:0
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
