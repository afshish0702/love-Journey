// Floating hearts generation
const heartsContainer = document.getElementById("hearts-container");

for (let i = 0; i < 25; i++) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.animationDelay = `${Math.random() * 10}s`;
  heartsContainer.appendChild(heart);
}

// Navigate to next page with loader
function goToNextPage() {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  setTimeout(() => {
    window.location.href = "./jigsaw.html";
  }, 6000); // 🔼 6 seconds now
}

// Automatically call function and play audio on page load
window.addEventListener("load", () => {
  goToNextPage();

  const bgMusic = document.getElementById("bg-music");
  // Ensure it plays after user gesture is bypassed (or autoplay allowed)
  if (bgMusic) {
    bgMusic.volume = 0.5;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay started
        })
        .catch((err) => {
          console.log("Autoplay prevented:", err);
        });
    }
  }
});
