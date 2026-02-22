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

const questions = [

{
passage:"Batik tulis dibuat menggunakan canting dan malam panas. Proses ini membutuhkan ketelitian tinggi karena setiap garis menentukan keindahan motif.",
question:"Nilai karakter utama dalam proses membatik adalah...",
options:["Ketelitian","Kecepatan","Persaingan","Produksi massal"],
answer:0
},

{
passage:"Gerabah dibuat dari tanah liat yang dibakar pada suhu tinggi agar mengeras dan tahan lama.",
question:"Tujuan pembakaran gerabah adalah...",
options:["Mewarnai","Mengeraskan","Menghias","Mempercepat"],
answer:1
},

{
passage:"Anyaman bambu digunakan untuk membuat keranjang dan tikar karena fleksibel dan ramah lingkungan.",
question:"Keunggulan bambu adalah...",
options:["Mahal","Sulit dibentuk","Ramah lingkungan","Berat"],
answer:2
},

{
passage:"Ukiran kayu tradisional mengandung simbol kehidupan seperti tumbuhan dan hewan.",
question:"Fungsi simbol dalam ukiran adalah...",
options:["Dekorasi biasa","Nilai filosofis","Agar mahal","Ekspor"],
answer:1
},

{
passage:"Tenun tradisional dibuat dengan menyilangkan benang secara teratur hingga membentuk pola.",
question:"Nilai yang dipelajari dari menenun adalah...",
options:["Kesabaran","Kekuatan","Kecepatan","Kompetisi"],
answer:0
},

{
passage:"Kerajinan kulit memanfaatkan limbah hewan menjadi produk bernilai jual.",
question:"Konsep yang diterapkan adalah...",
options:["Produksi massal","Daur ulang","Impor","Eksploitasi"],
answer:1
},

{
passage:"Miniatur rumah adat digunakan sebagai media edukasi budaya.",
question:"Fungsi miniatur tersebut adalah...",
options:["Investasi","Edukasi","Mainan","Dekorasi"],
answer:1
},

{
passage:"Produk kriya handmade biasanya memiliki harga lebih tinggi dibanding produk pabrik.",
question:"Alasan harga lebih tinggi adalah...",
options:["Proses manual","Warna","Iklan","Diskon"],
answer:0
},

{
passage:"Keramik modern memadukan teknik tradisional dan desain kontemporer.",
question:"Makna dari perpaduan tersebut adalah...",
options:["Tradisi ditinggalkan","Inovasi dan tradisi seimbang","Modern lebih penting","Hanya ekspor"],
answer:1
},

{
passage:"Seni kriya merupakan bagian dari seni rupa terapan karena memiliki fungsi pakai.",
question:"Seni kriya termasuk seni rupa...",
options:["Murni","Terapan","Digital","Abstrak"],
answer:1
},

// 20 soal tambahan variasi berbeda

{
passage:"Songket adalah kain tradisional yang dihiasi benang emas atau perak.",
question:"Ciri khas songket adalah...",
options:["Benang emas","Tanpa motif","Polos","Modern"],
answer:0
},

{
passage:"Topeng tradisional sering digunakan dalam pertunjukan tari daerah.",
question:"Fungsi topeng adalah...",
options:["Hiasan saja","Properti pertunjukan","Mainan","Barang ekspor"],
answer:1
},

{
passage:"Seni ukir Jepara terkenal hingga mancanegara.",
question:"Keunggulan ukir Jepara adalah...",
options:["Plastik","Detail halus","Cepat","Murah"],
answer:1
},

{
passage:"Kerajinan perak banyak ditemukan di Yogyakarta.",
question:"Bahan utama kerajinan tersebut adalah...",
options:["Emas","Perak","Besi","Kayu"],
answer:1
},

{
passage:"Tas rajut dibuat dengan teknik merangkai benang menggunakan jarum khusus.",
question:"Teknik tersebut disebut...",
options:["Membatik","Merajut","Menganyam","Mengukir"],
answer:1
},

{
passage:"Kain tenun ikat dibuat dengan mengikat benang sebelum dicelup warna.",
question:"Keunikan tenun ikat adalah...",
options:["Tanpa warna","Motif dari ikatan","Cetak mesin","Digital"],
answer:1
},

{
passage:"Kerajinan kaca patri sering digunakan pada bangunan ibadah.",
question:"Fungsi kaca patri adalah...",
options:["Penutup biasa","Dekoratif dan simbolis","Plastik","Mainan"],
answer:1
},

{
passage:"Patung kayu tradisional dibuat secara manual dengan alat pahat.",
question:"Alat utama membuat patung kayu adalah...",
options:["Canting","Pahat","Jarum","Mesin cetak"],
answer:1
},

{
passage:"Seni kriya berkembang karena kebutuhan masyarakat akan benda pakai.",
question:"Faktor perkembangan kriya adalah...",
options:["Mode","Kebutuhan","Iklan","Media sosial"],
answer:1
},

{
passage:"Produk kriya mencerminkan identitas budaya daerah pembuatnya.",
question:"Makna identitas budaya adalah...",
options:["Tanpa ciri khas","Ciri khas daerah","Impor","Modernisasi"],
answer:1
},

{
passage:"Anyaman rotan banyak digunakan untuk membuat furnitur.",
question:"Bahan utama furnitur tersebut adalah...",
options:["Rotan","Plastik","Besi","Kaca"],
answer:0
},

{
passage:"Seni kriya termasuk warisan budaya yang perlu dilestarikan.",
question:"Alasan pelestarian adalah...",
options:["Agar punah","Menjaga budaya","Komersial","Modernisasi"],
answer:1
},

{
passage:"Kerajinan tangan membutuhkan kreativitas tinggi.",
question:"Kreativitas berarti...",
options:["Meniru","Mencipta hal baru","Menyalin","Menghapus"],
answer:1
},

{
passage:"Benda kriya memiliki nilai estetika.",
question:"Estetika berarti...",
options:["Fungsi","Keindahan","Harga","Berat"],
answer:1
},

{
passage:"Seni kriya modern mengikuti perkembangan zaman.",
question:"Mengikuti perkembangan zaman berarti...",
options:["Stagnan","Berinovasi","Diam","Tradisional saja"],
answer:1
},

{
passage:"Proses produksi kriya biasanya tidak menggunakan mesin besar.",
question:"Artinya kriya bersifat...",
options:["Industri berat","Manual","Digital","Robotik"],
answer:1
},

{
passage:"Batik telah diakui UNESCO sebagai warisan budaya.",
question:"Pengakuan tersebut menunjukkan bahwa batik adalah...",
options:["Biasa","Warisan budaya","Modern","Plastik"],
answer:1
},

{
passage:"Kerajinan tangan sering diproduksi dalam skala kecil.",
question:"Skala kecil berarti...",
options:["Massal","Terbatas","Pabrik besar","Industri"],
answer:1
},

{
passage:"Produk kriya lokal dapat meningkatkan ekonomi daerah.",
question:"Dampak ekonomi berarti...",
options:["Kerugian","Peningkatan pendapatan","Pengangguran","Kemiskinan"],
answer:1
},

{
passage:"Seni kriya memerlukan keterampilan khusus.",
question:"Keterampilan khusus berarti...",
options:["Keahlian tertentu","Sembarangan","Acak","Tanpa belajar"],
answer:0
}

];


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
