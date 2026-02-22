const questions = [
{
passage:"Seni kriya adalah cabang seni rupa yang mengutamakan keterampilan tangan dan memiliki nilai fungsi.",
question:"Apa ciri utama seni kriya?",
options:["Tidak memiliki fungsi","Mengutamakan keterampilan tangan","Hanya untuk pajangan","Berbasis digital"],
answer:1
},
{
passage:"Batik merupakan warisan budaya Indonesia yang dibuat dengan teknik perintangan malam.",
question:"Teknik utama dalam pembuatan batik adalah...",
options:["Mengukir","Mencetak","Perintangan malam","Melukis digital"],
answer:2
},
{
passage:"Keramik dibuat dari tanah liat yang dibentuk lalu dibakar.",
question:"Tujuan pembakaran pada keramik adalah...",
options:["Memberi warna","Mengeraskan","Menghias","Mendinginkan"],
answer:1
},
{
passage:"Anyaman dibuat dengan teknik menyilang bahan seperti rotan atau bambu.",
question:"Teknik dasar anyaman adalah...",
options:["Menjahit","Menyilang","Melipat","Menggambar"],
answer:1
},
{
passage:"Ukiran Jepara terkenal dengan detail dan kehalusannya.",
question:"Keunggulan ukiran Jepara terletak pada...",
options:["Beratnya","Warnanya","Detail halus","Bahannya plastik"],
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


let currentIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

function shuffle(array){
for(let i=array.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
}

function startQuiz(){

document.getElementById("startScreen").style.display="none";
document.querySelector(".container").style.display="block";
document.querySelector(".timer-wrapper").style.display="block";

shuffle(questions);
showQuestion();
startTimer();
}

function showQuestion(){
const q = questions[currentIndex];

document.getElementById("passage").textContent = q.passage;
document.getElementById("question").textContent = q.question;

const optionsDiv = document.getElementById("options");
optionsDiv.innerHTML="";

q.options.forEach((opt,index)=>{
const btn = document.createElement("button");
btn.textContent = opt;
btn.onclick = ()=>selectAnswer(index);
optionsDiv.appendChild(btn);
});

document.getElementById("progress").textContent =
"Soal "+(currentIndex+1);
}

function selectAnswer(index){
if(index === questions[currentIndex].answer){
score++;
}
currentIndex++;
if(currentIndex < questions.length){
showQuestion();
}else{
finishQuiz();
}
}

function startTimer(){
const circle = document.getElementById("progressCircle");
const total = 30;
const circumference = 283;

timerInterval = setInterval(()=>{
timeLeft--;
document.getElementById("timerText").textContent = timeLeft;

let offset = circumference - (timeLeft/total)*circumference;
circle.style.strokeDashoffset = offset;

if(timeLeft <= 0){
clearInterval(timerInterval);
finishQuiz();
}

},1000);
}

function finishQuiz(){
clearInterval(timerInterval);
document.querySelector(".container").innerHTML =
"<h1>Kuis Selesai</h1><p>Skor kamu: "+score+"</p>";
}

startQuiz();
