/*
Develop by UKMP
Source data from IANS.ino
automated render defined shell
*/

// data kekeruhan air awal
let data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
        {
            label: "Kekeruhan Air",
            data: [70, 60, 80, 50, 90, 40, 75],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            fill: true,
            tension: 0.4,
            pointRadius: 3
        }
    ]
};

// membuat grafik
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Grafik Kekeruhan Air"
            },
            legend: {
                position: "bottom"
            },
            animation: {
                duration: 2000,
                easing: "easeInOutQuad"
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Bulan"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Kekeruhan"
                }
            }
        }
    }
});

// mengubah data secara random setiap 3 detik
setInterval(() => {
    data.datasets[0].data = [
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50,
        Math.floor(Math.random() * 50) + 50
    ];
    chart.update();
}, 3000);
