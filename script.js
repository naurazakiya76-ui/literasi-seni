
/* ===== TEMA WARNA ===== */
const theme = localStorage.getItem("theme");
if (theme) document.body.classList.add(theme);

/* ===== VARIABEL ===== */
let score = 0;
let correctCount = 0;
let time = 0;
let timerInterval;
let used = [];
let currentQ;

/* ===== BANK SOAL (15 SOAL) ===== */
const questions = [

{
passage:"Seni kriya adalah seni yang mengutamakan keterampilan tangan dalam pembuatannya.",
question:"Ciri utama seni kriya adalah …",
options:["Teknologi tinggi","Keterampilan tangan","Musik","Tari"],
answer:1
},

{
passage:"Batik merupakan warisan budaya Indonesia yang diakui UNESCO.",
question:"Alat utama membatik tulis adalah …",
options:["Kuas","Canting","Pisau","Pahat"],
answer:1
},

{
passage:"Anyaman dibuat dengan teknik menyilang bahan secara teratur.",
question:"Bahan anyaman yang umum adalah …",
options:["Bambu","Besi","Kaca","Plastik"],
answer:0
},

{
passage:"Gerabah dibuat dari tanah liat yang dibentuk lalu dibakar.",
question:"Gerabah termasuk seni kriya karena …",
options:["Dicetak mesin","Buatan tangan","Digital","Modern"],
answer:1
},

{
passage:"Seni kriya memiliki nilai fungsi selain keindahan.",
question:"Nilai fungsi berarti …",
options:["Untuk pajangan saja","Memiliki kegunaan","Tidak dipakai","Abstrak"],
answer:1
},

{
passage:"Ukiran kayu banyak ditemukan di Jepara.",
question:"Ukiran termasuk seni kriya karena …",
options:["Dicat","Dipahat tangan","Dicetak","Difoto"],
answer:1
},

{
passage:"Kerajinan rotan sering dibuat menjadi kursi dan meja.",
question:"Rotan dipilih karena …",
options:["Rapuh","Kuat & lentur","Mahal","Berat"],
answer:1
},

{
passage:"Tenun adalah teknik membuat kain secara tradisional.",
question:"Tenun dibuat dengan cara …",
options:["Dijahit","Disilangkan benang","Dilem","Dilukis"],
answer:1
},

{
passage:"Topeng tradisional dibuat dengan seni kriya.",
question:"Bahan topeng biasanya …",
options:["Kayu","Kertas","Air","Batu bata"],
answer:0
},

{
passage:"Keramik dibuat dari tanah liat lalu dibakar.",
question:"Proses pembakaran bertujuan untuk …",
options:["Mewarnai","Mengeraskan","Melembutkan","Menghias"],
answer:1
},

{
passage:"Seni kriya sering mencerminkan budaya daerah.",
question:"Artinya seni kriya …",
options:["Tidak budaya","Mengandung nilai budaya","Modern saja","Asing"],
answer:1
},

{
passage:"Mozaik dibuat dari potongan kecil bahan.",
question:"Mozaik disusun dari …",
options:["Kertas utuh","Potongan kecil","Cat air","Benang"],
answer:1
},

{
passage:"Kerajinan kulit dibuat menjadi tas atau sepatu.",
question:"Bahan dasarnya adalah …",
options:["Kulit hewan","Kain","Plastik","Kaca"],
answer:0
},

{
passage:"Miniatur rumah adat termasuk seni kriya.",
question:"Miniatur berarti …",
options:["Besar","Kecil tiruan","Asli","Modern"],
answer:1
},

{
passage:"Seni kriya membantu melestarikan budaya.",
question:"Pelestarian berarti …",
options:["Menghilangkan","Menjaga","Menjual","Membuang"],
answer:1
}

];

/* ===== TIMER ===== */
function startTimer(){
time=0;
document.getElementById("timer").innerText="Waktu: 0";
timerInterval=setInterval(()=>{
time++;
document.getElementById("timer").innerText="Waktu: "+time;
},1000);
}

/* ===== AMBIL SOAL ACAK ===== */
function randomQuestion(){
if(used.length===questions.length) used=[];
let i;
do{
i=Math.floor(Math.random()*questions.length);
}while(used.includes(i));
used.push(i);
return questions[i];
}

/* ===== TAMPILKAN SOAL ===== */
function loadQuestion(){
startTimer();
currentQ=randomQuestion();

document.getElementById("passage").innerText=currentQ.passage;
document.getElementById("question").innerText=currentQ.question;

const opt=document.getElementById("options");
opt.innerHTML="";

currentQ.options.forEach((o,i)=>{
let b=document.createElement("button");
b.innerText=o;
b.onclick=()=>check(i);
opt.appendChild(b);
});
}

/* ===== CEK JAWABAN ===== */
function check(i){
clearInterval(timerInterval);

if(i===currentQ.answer){
correctCount++;
score += time<=180 ? 25 : 15;
}

if(correctCount>=10){
localStorage.setItem("finalScore",score);
location.href="result.html";
}else{
loadQuestion();
}
}

/* ===== MULAI ===== */
loadQuestion();
