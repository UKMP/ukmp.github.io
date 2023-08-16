var header = document.querySelector(".header");
var startY = 0;
var threshold = header.offsetHeight;

var footer = document.querySelector(".footer");
var allAppsButton = document.querySelectorAll(".footer a")[1];
var modal = document.createElement("div");
var modalContent = document.createElement("div");
var startY = 0;
var threshold = footer.offsetHeight;
var modalOpened = false;

function onTouchStart(event) {
    if (event.touches.length == 1) {
        startY = event.touches[0].clientY;
    }
}

function onTouchMove(event) {
    if (event.touches.length == 1) {
        var currentY = event.touches[0].clientY;
        var distance = currentY - startY;
        if (distance > 0 && distance < threshold && !modalOpened) {
            footer.style.transform = "translateY(" + distance + "px)";
        }
    }
}

function onTouchEnd(event) {
    if (modalOpened) {
        closeModal();
    } else {
        footer.style.transition = "transform 0.3s";
        footer.style.transform = "";
        if (event.changedTouches[0].clientY - startY > 50) {
            openModal();
        }
    }
}

function openModal() {
    modalOpened = true;
    modal.style.display = "block";
    setTimeout(function () {
        modalContent.style.transform = "translateY(0)";
    }, 50);

    // tambahkan event listener untuk menutup modal saat pengguna mengklik di luar modal
    document.body.addEventListener("touchend", onTouchEnd);
}

function closeModal() {
    modalOpened = false;
    modalContent.style.transform = "translateY(100%)";
    setTimeout(function () {
        modal.style.display = "none";
    }, 300);

    // hapus event listener untuk menutup modal saat pengguna mengklik di luar modal
    document.body.removeEventListener("touchend", onTouchEnd);
}

modal.style.display = "none";
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0, 0, 0, 0.5)";
modal.style.zIndex = "999";

modalContent.style.position = "absolute";
modalContent.style.bottom = "0";
modalContent.style.width = "100%";
modalContent.style.height = "30%";
modalContent.style.background = "white";
modalContent.style.transition = "transform 0.3s";
modalContent.style.transform = "translateY(100%)";
modal.appendChild(modalContent);

allAppsButton.addEventListener("click", function (event) {
    event.preventDefault();
    openModal();
});

footer.addEventListener("touchstart", onTouchStart);
footer.addEventListener("touchmove", onTouchMove);
footer.addEventListener("touchend", onTouchEnd);

// tambahkan event listener untuk menghitung ulang threshold saat ukuran layar berubah
window.addEventListener("resize", function () {
    threshold = footer.offsetHeight;
});


function onTouchStart(event) {
    if (event.touches.length == 1) {
        startY = event.touches[0].clientY;
    }
}

function onTouchMove(event) {
    if (event.touches.length == 1) {
        var currentY = event.touches[0].clientY;
        var distance = currentY - startY;
        if (distance > 0 && distance < threshold) {
            header.style.transform = "translateY(" + distance + "px)";
        }
    }
}

function onTouchEnd(event) {
    header.style.transition = "transform 0.3s";
    header.style.transform = "";
}

header.addEventListener("touchstart", onTouchStart);
header.addEventListener("touchmove", onTouchMove);
header.addEventListener("touchend", onTouchEnd);
