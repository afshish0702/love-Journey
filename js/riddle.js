// script.js
const hackerMessages = [
    "You are a wife of a hacker and I want you to clear all the problems and situations to come close to me. Your first problem is: Solve this riddle to come one step closer.",
    "Hii dear, You are in a Situation where you are a bomb master. A bomb is active, and the timer will start ticking. You have 3 minutes to defuse it.",
    "The bomb design is very complicated. To stop it, solve the riddle. You have only 3 minutes and 3 chances.\n\n'Use Your Mind',\n'Think Sharply',\n'Think Out of The Box'.\n\nGood Luck Dear!"
];

// Array of riddles with questions and answers
const riddles = [
    {
        question: "What has keys but can't open locks?",
        answer: "keyboard"
    },
    {
        question: "I’m tall when I’m young, and I’m short when I’m old. Who am I?",
        answer: "candle"
    },
    {
        question: "What goes up but never comes down",
        answer: "age"
    },
    {
        question: "What invention lets you look right through a wall?",
        answer: "window"
    }
];

const wrongQuotes = [
    "Even the best fail sometimes. Try again!",
    "Wrong move. Analyze deeper!",
    "Keep calm and decode on.",
    "Mistakes are proof you're trying."
];

let wrongAttempts = 0;
let timer;
let timeLeft = 180;
let riddle = riddles[Math.floor(Math.random() * riddles.length)];

const tickSound = document.getElementById("tick-sound");
const explosionSound = document.getElementById("explosion-sound");
const typingSound = document.getElementById("typing-sound");

function typeText(element, text, callback) {
    element.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        if (text[i] === '\n') {
            element.innerHTML += '<br>';
        } else {
            element.innerHTML += text.charAt(i);
            typingSound.currentTime = 0;
            typingSound.play();
        }
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 3000);
        }
    }, 35);
}

function showModal(text, isSuccess = false) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");
    modal.style.display = "block";
    modalTitle.innerHTML = isSuccess ? "🎉 SUCCESS" : "❌ ACCESS DENIED!";
    modalMessage.innerHTML = text;
    document.querySelector(".modal-content").style.borderColor = isSuccess ? "#0f0" : "red";
    document.querySelector(".modal-content").style.color = isSuccess ? "#0f0" : "red";
    setTimeout(() => {
        modal.style.display = "none";
    }, isSuccess ? 5000 : 2500);
}

document.getElementById("modal-close").onclick = function () {
    document.getElementById("modal").style.display = "none";
};

function startBombTimer() {
    const bombTimer = document.getElementById("bomb-timer");
    tickSound.currentTime = 0;
    tickSound.play();
    timer = setInterval(() => {
        timeLeft--;
        const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const sec = String(timeLeft % 60).padStart(2, '0');
        bombTimer.textContent = `${min}:${sec}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            bombBlast();
        }
    }, 1000);
}

function bombBlast() {
    tickSound.pause();
    explosionSound.play();
    document.getElementById("explosion").style.display = "flex";
    document.getElementById("bomb-section").style.display = "none";
    document.getElementById("riddle-section").style.display = "none";
    setTimeout(() => {
        showModal("💥 You Died!", false);
        setTimeout(() => location.reload(), 2500);
    }, 5000);
}

function checkAnswer() {
    const ans = document.getElementById("answer").value.toLowerCase().trim();
    if (ans === riddle.answer.toLowerCase()) {
        clearInterval(timer);
        tickSound.pause();
        document.getElementById("clapping-sound").play();
        showModal("Congratulations! You defused the bomb!", true);
        setTimeout(() => location.href = "./loader1.html", 5000);
    } else {
        wrongAttempts++;
        if (wrongAttempts >= 3) {
            clearInterval(timer);
            bombBlast();
        } else {
            const quote = wrongQuotes[Math.floor(Math.random() * wrongQuotes.length)];
            showModal(quote);
        }
    }
}

window.onload = () => {
    document.getElementById("riddle-section").style.display = "none";
    document.getElementById("bomb-section").style.display = "flex";
    let index = 0;

    function playTypingSoundBeforeText(callback) {
        typingSound.currentTime = 0;
        typingSound.play();
        setTimeout(callback, 500);
    }

    function nextMessage() {
        if (index < hackerMessages.length) {
            playTypingSoundBeforeText(() => {
                typeText(document.getElementById("story"), hackerMessages[index], () => {
                    document.getElementById("story").innerHTML = "";
                    index++;
                    nextMessage();
                });
            });
        } else {
            document.getElementById("riddle-section").style.display = "flex";
            document.getElementById("bomb-section").style.display = "flex";
            typeText(document.getElementById("riddle-text"), riddle.question);
            startBombTimer();
        }
    }

    nextMessage();
};