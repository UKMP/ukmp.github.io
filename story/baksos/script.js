const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error(err);
    });

setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let totalPixels = data.length / 4;
    let sampahPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        if (red < 100 && green > 100 && blue < 100) {
            sampahPixels++;
        }
    }
    let persenSampah = (sampahPixels / totalPixels) * 100;
    if (persenSampah > 50) {
        console.log("100% sampah");
        alert("100% sampah");
    } else {
        console.log("tidak ada sampah");
    }
}, 1000);
