// === Typewriter Intro ===
const introText = "You've found a mysterious locked box... Can you unlock the secret inside?";
const typewriterElement = document.getElementById("typewriter-text");
let index = 0;

function typeWriter() {
    if (index < introText.length) {
        typewriterElement.innerHTML += introText.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    } else {
        document.getElementById("puzzle-content").style.display = "block";
        document.getElementById("typewriter-container").style.display = "none";
    }
}
typeWriter();

// === Puzzle Logic ===
let attemptsLeft = 3;
let isUnlocked = false;
const correctCode = "07/02/2022";

const input = document.getElementById("passcode");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
    if (isUnlocked || attemptsLeft <= 0) return;

    const userCode = input.value.trim();
    if (userCode === correctCode) {
        isUnlocked = true;
        triggerSuccess();
    } else {
        attemptsLeft--;
        if (attemptsLeft <= 0) {
            triggerFailure("You've run out of attempts...");
        } else {
            showModal(`Wrong code! Attempts left: ${attemptsLeft}`);
        }
    }
});

// === Hint Reveal Logic ===
document.querySelectorAll(".hint-object").forEach(item => {
    const emoji = item.textContent.trim();

    if (emoji === "💌" || emoji === "📖") {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            item.classList.add("clicked");

            if (emoji === "💌") {
                showModal("Read the book. Maybe there is something helpful for you. Better luck!");
            } else if (emoji === "📖") {
                showModal("Everything is unlocked with Love. It Only unlock by Our valentine's Day. Good luck!");
            }
        });
    } else {
        item.style.opacity = 1;
    }
});

// === Success Scenario ===
function triggerSuccess() {
    const lockImg = document.getElementById("lock-img");
    lockImg.src = "./assets/lock.gif"; // Animated unlocked lock
    lockImg.classList.add("clicked");

    showModal("You unlocked the mystery! ❤️");

    setTimeout(() => {
        window.location.href = "./loader2.html"; // Redirect to love letter page
    }, 3000);
}

// === Failure Scenario ===
function triggerFailure(message) {
    showModal(message);
}

// === Show Modal Message ===
function showModal(message) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    modalMessage.innerText = message;
    modal.classList.remove("hidden");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 2500);
}
