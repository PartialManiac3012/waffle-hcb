var imageToggle = false;
var jokeLoaded = false;

setTimeout(function () {
  var banner = document.getElementById("welcome-banner");
  banner.style.display = "block";

  setTimeout(function () {
    banner.style.display = "none";
  }, 4000);
}, 1500);

function updateClock() {
  var now = new Date();
  var h = now.getHours().toString().padStart(2, "0");
  var m = now.getMinutes().toString().padStart(2, "0");
  var s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("clock").textContent = "🕐 " + h + ":" + m + ":" + s;
}

updateClock();
setInterval(updateClock, 1000);



var canvas = document.getElementById("swap-img");
var ctx = canvas.getContext("2d");
var img1 = new Image();
var img2 = new Image();
img1.src = "1.png";
img2.src = "2.png";

function drawImageToCanvas(img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  try {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  } catch (e) {
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333";
    ctx.fillText("image missing", 10, 20);
  }
}

img1.onload = function () {
  drawImageToCanvas(img1);
  var label = document.getElementById("img-label");
  if (label) label.textContent = "showing: image 1";
  canvas.style.borderColor = "#d5c5a8";
  imageToggle = false;
};

function swapImage() {
  var label = document.getElementById("img-label");

  if (imageToggle === false) {
    if (img2.complete) {
      drawImageToCanvas(img2);
    } else {
      img2.onload = function () { drawImageToCanvas(img2); };
    }
    if (label) label.textContent = "showing: image 2";
    canvas.style.borderColor = "#4a3a8a";
    imageToggle = true;
  } else {
    if (img1.complete) {
      drawImageToCanvas(img1);
    } else {
      img1.onload = function () { drawImageToCanvas(img1); };
    }
    if (label) label.textContent = "showing: image 1";
    canvas.style.borderColor = "#d5c5a8";
    imageToggle = false;
  }
}

var input = document.getElementById("user-input");
var preview = document.getElementById("live-preview");
var charCount = document.getElementById("char-count");

input.addEventListener("input", function () {
  var text = input.value;

  if (text.length === 0) {
    preview.textContent = "your text will show up here live ✏️";
    preview.className = "empty";
    charCount.textContent = "0 characters";
  } else {
    preview.textContent = text;
    preview.className = "";
    charCount.textContent = text.length + " character" + (text.length === 1 ? "" : "s");

    if (text.length > 80) {
      preview.style.color = "#c97c3a";
    } else {
      preview.style.color = "#3b2a1a";
    }
  }
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (input.value.trim().length > 0) {
      preview.style.fontWeight = "bold";
      setTimeout(function () {
        preview.style.fontWeight = "normal";
      }, 600);
    }
  }
});
