function updateJam() {
    var date = new Date();
    var jam = date.getHours();
    var menit = date.getMinutes();
    var detik = date.getSeconds();

    // Ubah format waktu menjadi hh:mm:ss
    var waktu = (jam < 10 ? "0" : "") + jam + ":" + (menit < 10 ? "0" : "") + menit + ":" + (detik < 10 ? "0" : "") + detik;

    document.getElementById("jam").textContent = "Sekarang pukul " + waktu;
}

function tampilkanJadwal(iftar, sahur) {
    document.getElementById("jadwal").textContent = "Jadwal berbuka puasa hari ini: " + iftar + ". Jadwal sahur besok: " + sahur;
}

function dapatkanJadwal(lat, lon) {
    var apiKey = "YOUR_API_KEY"; // Ganti dengan API key Anda dari Aladhan
    var url = "https://api.aladhan.com/v1/calendar?latitude=" + lat + "&longitude=" + lon + "&method=4"; // method=4 mengacu pada metode perhitungan waktu shalat
    fetch(url, {
        headers: {
            "X-API-KEY": apiKey // Mengirimkan API key dalam header X-API-KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        var iftar = data.data[today.getDate() - 1].timings.Maghrib;
        var sahur = data.data[tomorrow.getDate() - 1].timings.Fajr;

        tampilkanJadwal(iftar, sahur);
    })
    .catch(error => console.error('Error:', error));
}

function dapatkanLokasi() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            dapatkanJadwal(lat, lon);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Panggil fungsi updateJam setiap detik
setInterval(updateJam, 1000);

// Panggil fungsi dapatkanLokasi untuk mendapatkan jadwal berbuka puasa dan sahur berdasarkan lokasi pengguna
dapatkanLokasi();
