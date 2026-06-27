var moodMessages = {
  sunny: "it's a bright, warm day. the kind where everything feels a bit more possible. ☀️",
  rainy: "rain on the window, something warm to drink, nowhere to be. actually pretty perfect. 🌧",
  cozy:  "low light, soft blanket, maybe a candle. the whole world can wait. 🕯",
  fresh: "everything smells like outside. open a window. take a breath. it helps. 🌿"
};

var fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
];

function toggleAccordion(header) {
  var body = header.nextElementSibling;
  var arrow = header.querySelector(".accordion-arrow");
  var isOpen = body.style.display === "block";

  var allBodies = document.querySelectorAll(".accordion-body");
  var allArrows = document.querySelectorAll(".accordion-arrow");

  allBodies.forEach(function (b) {
    b.style.display = "none";
  });
  allArrows.forEach(function (a) {
    a.className = "accordion-arrow";
  });

  if (!isOpen) {
    body.style.display = "block";
    arrow.className = "accordion-arrow open";
  }
}

function setMood(mood) {
  var display = document.getElementById("mood-display");
  var style = moodStyles[mood];
  var msg = moodMessages[mood];

  if (style) {
    display.style.background = style.bg;
    display.style.color = style.color;
  }

  if (msg) {
    display.textContent = msg;
  }
}

function loadQuote() {
  var quoteText = document.getElementById("quote-text");
  var quoteAuthor = document.getElementById("quote-author");

  quoteText.className = "loading";
  quoteText.textContent = "finding something good...";
  quoteAuthor.textContent = "";

  fetch("https://api.quotable.io/random?maxLength=120")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      quoteText.className = "";
      quoteText.textContent = data.content;
      quoteAuthor.textContent = "— " + data.author;
    })
    .catch(function () {

      var pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteText.className = "";
      quoteText.textContent = pick.content;
      quoteAuthor.textContent = "— " + pick.author;
    });
}

loadQuote();

setInterval(function () {
  loadQuote();
}, 45000);

