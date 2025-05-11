// Navigate to next page with loader
function goToNextPage() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    setTimeout(() => {
      window.location.href = "./riddle.html";
    }, 3000); // 3 second delay
  }
  
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
