let currentIndex = 0;
let score = 0;
let answered = 0;
let timeLeft = 30;
let timerInterval;
function shuffleQuestions(array){
for(let i = array.length - 1; i > 0; i--){
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}
const questions = [
{
passage:"Batik tulis dibuat menggunakan canting dan malam panas.",
question:"Nilai utama dalam membatik adalah...",
options:["Ketelitian","Kecepatan","Persaingan","Produksi massal"],
answer:0
},
{
passage:"Gerabah dibuat dari tanah liat yang dibakar.",
question:"Tujuan pembakaran gerabah adalah...",
options:["Mewarnai","Mengeraskan","Menghias","Mempercepat"],
answer:1
},
{
passage:"Anyaman bambu digunakan untuk membuat keranjang.",
question:"Keunggulan bambu adalah...",
options:["Mahal","Sulit dibentuk","Ramah lingkungan","Berat"],
answer:2
},
{
passage:"Ukiran kayu tradisional memiliki nilai filosofis.",
question:"Fungsi simbol dalam ukiran adalah...",
options:["Dekorasi biasa","Nilai filosofis","Agar mahal","Ekspor"],
answer:1
},
{
passage:"Tenun dibuat dengan menyilangkan benang.",
question:"Nilai yang dipelajari dari menenun adalah...",
options:["Kesabaran","Kekuatan","Kecepatan","Kompetisi"],
answer:0
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


function startQuiz(){

document.getElementById("startBtn").style.display = "none";

currentIndex = 0;
score = 0;
answered = 0;
timeLeft = 30;

document.getElementById("timer").textContent = timeLeft;
shuffleQuestions(questions);
startTimer();
showQuestion();
}

function startTimer(){

const circle = document.getElementById("progressCircle");
const total = 30;
const circumference = 220;

timerInterval = setInterval(()=>{
timeLeft--;

document.getElementById("timerText").textContent = timeLeft;

let offset = circumference - (timeLeft / total) * circumference;
circle.style.strokeDashoffset = offset;

if(timeLeft <= 0){
clearInterval(timerInterval);
finishQuiz();
}
},1000);
}

function showQuestion(){
if(currentIndex>=questions.length){
finishQuiz();
return;
}

const q=questions[currentIndex];

document.getElementById("passage").textContent=q.passage;
document.getElementById("question").textContent=q.question;

const optionsDiv=document.getElementById("options");
optionsDiv.innerHTML="";

q.options.forEach((option,i)=>{
const btn=document.createElement("button");
btn.textContent=option;
btn.onclick=()=>selectAnswer(i);
optionsDiv.appendChild(btn);
});

document.getElementById("progress").textContent=
"Soal dijawab: "+answered;
}

function selectAnswer(selected){
answered++;

if(selected===questions[currentIndex].answer){
score++;
}

currentIndex++;
showQuestion();
}

function finishQuiz(){
clearInterval(timerInterval);

document.querySelector(".container").innerHTML=`
<h2>Waktu Habis!</h2>
<p>Total dijawab: ${answered}</p>
<p>Jawaban benar: ${score}</p>
<p>Skor akhir: ${score} poin</p>
<button onclick="location.reload()">Main Lagi</button>
`;
}
