// Efek mengetik
const element = document.querySelector("#ketik");
const textOutsideSpan = element.childNodes[0].textContent.trim();
const speed = 100;
let i = 0;

element.childNodes[0].textContent = "";

function typeWriter() {
  if (i < textOutsideSpan.length) {
    element.childNodes[0].textContent += textOutsideSpan.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = typeWriter;

// Skema pembuatan meme
const fileInput = document.getElementById("myFile");
const memeTextInput = document.getElementById("memeText");
const posXInput = document.getElementById("posX");
const posYInput = document.getElementById("posY");
const memeCanvas = document.getElementById("memeCanvas");
const ctx = memeCanvas.getContext("2d");
const submitButton = document.getElementById("submitMeme");
const downloadButton = document.getElementById("downloadMeme");
const textColorInput = document.getElementById("textColor");
const dropArea = document.getElementById("dropArea");

let uploadedImage;
let currentTextColor = "#ffffff";

// Fungsi untuk mengganti gambar
function ubahGambar(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  if (file) {
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        uploadedImage = img;
        drawMeme();
      };
    };

    reader.readAsDataURL(file);
  } else {
    alert("Silakan pilih gambar!");
  }
}

// Fungsi untuk menangani gambar yang di-drop
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault(); // Mencegah perilaku default
  dropArea.classList.add("bg-gray-200"); // Menandai area drop
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("bg-gray-200"); // Mengembalikan gaya area drop
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("bg-gray-200"); // Mengembalikan gaya area drop
  const files = e.dataTransfer.files; // Ambil file yang di-drop
  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        uploadedImage = img;
        drawMeme();
      };
    };

    reader.readAsDataURL(file);
  } else {
    alert("Silakan pilih gambar!");
  }
});

// Fungsi untuk menggambar meme
function drawMeme() {
  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);

  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, memeCanvas.width, memeCanvas.height);

    const memeText = memeTextInput.value;

    ctx.font = "20px Arial";
    ctx.fillStyle = currentTextColor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    const x = parseInt(posXInput.value, 10);
    const y = parseInt(posYInput.value, 10);
    ctx.strokeText(memeText, x, y);
    ctx.fillText(memeText, x, y);

    downloadButton.disabled = false;
  }
}

// Fungsi untuk mengunduh meme
function downloadMeme() {
  if (!uploadedImage) {
    alert("Silakan buat meme terlebih dahulu!");
    return;
  }

  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = memeCanvas.toDataURL("image/png");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Event listeners
fileInput.addEventListener("change", ubahGambar);
memeTextInput.addEventListener("input", drawMeme);
posXInput.addEventListener("input", drawMeme);
posYInput.addEventListener("input", drawMeme);
textColorInput.addEventListener("input", function () {
  currentTextColor = this.value;
  drawMeme();
});

submitButton.addEventListener("click", () => {
  if (!uploadedImage) {
    alert("Silakan unggah gambar terlebih dahulu!");
    return;
  }
  drawMeme();
});

downloadButton.addEventListener("click", downloadMeme);
