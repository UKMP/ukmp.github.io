const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const result = document.getElementById('result');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });

function captureImage() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');
    // kirim gambar ke server untuk diproses lebih lanjut
    sendImageToServer(image);
}

function sendImageToServer(image) {
    // kirim data gambar ke server dengan menggunakan API
    fetch('/api/process-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: image
        })
    })
        .then((response) => response.json())
        .then((data) => {
            // tampilkan hasil deteksi di antarmuka pengguna
            result.innerHTML = `Tingkat Pencemaran: ${data.result}`;
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
}
