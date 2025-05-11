document.addEventListener("DOMContentLoaded", () => {
    const message = "Congratulations for your great success, Again You prove that You are the best One, You are the Perfect One. Now this becomes something difficult for you. Here You have To show Your Love and arrange the love in a frame correctly! Hope You understand what I want To say, Yes Your next task Is \n JIGSAW PUZZLE!";
    const typewriterElement = document.getElementById("typewriter-text");
    let index = 0;
  
    const backgroundMusic = document.getElementById("background-music");
  
    // Handle Click to Start
    const startOverlay = document.getElementById("start-overlay");
    startOverlay.addEventListener("click", () => {
      startOverlay.style.display = "none";
      backgroundMusic.play().catch(e => console.warn("Autoplay blocked:", e));
      typeWriter();
    });
  
    function typeWriter() {
      if (index < message.length) {
        typewriterElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          document.getElementById("typewriter-container").style.display = "none";
          const puzzleContainer = document.getElementById("puzzle-container");
          puzzleContainer.classList.remove("hidden");
          initPuzzle();
        }, 2000);
      }
    }
  
    // Puzzle Logic
    const puzzleGrid = document.getElementById("puzzle-grid");
    let tiles = [];
    let selectedTile = null;
    let timer;
    let timeLeft = 120;
  
    function initPuzzle() {
      puzzleGrid.innerHTML = "";
      tiles = [];
  
      for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.className = "puzzle-tile";
        tile.style.backgroundImage = "url('./assets/jigsaw.png')";
        tile.style.backgroundSize = "400px 400px";
        tile.style.backgroundPosition = `${-100 * (i % 4)}px ${-100 * Math.floor(i / 4)}px`;
        tile.setAttribute("data-index", i);
        tiles.push(tile);
      }
  
      shuffleArray(tiles);
  
      tiles.forEach(tile => {
        puzzleGrid.appendChild(tile);
        tile.addEventListener("click", () => handleTileClick(tile));
      });
  
      startTimer();
    }
  
    function handleTileClick(tile) {
      if (!selectedTile) {
        selectedTile = tile;
        tile.classList.add("selected");
      } else {
        swapTiles(selectedTile, tile);
        selectedTile.classList.remove("selected");
        selectedTile = null;
  
        if (checkSolved()) {
          clearInterval(timer);
          showModal("You did it! ❤️", true);
        }
      }
    }
  
    function swapTiles(tile1, tile2) {
      const index1 = Array.from(puzzleGrid.children).indexOf(tile1);
      const index2 = Array.from(puzzleGrid.children).indexOf(tile2);
  
      if (index1 < index2) {
        puzzleGrid.insertBefore(tile1, puzzleGrid.children[index2 + 1]);
        puzzleGrid.insertBefore(tile2, puzzleGrid.children[index1]);
      } else {
        puzzleGrid.insertBefore(tile2, puzzleGrid.children[index1 + 1]);
        puzzleGrid.insertBefore(tile1, puzzleGrid.children[index2]);
      }
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    function checkSolved() {
      return Array.from(puzzleGrid.children).every((tile, index) =>
        parseInt(tile.getAttribute("data-index")) === index
      );
    }
  
    function startTimer() {
      const timerDisplay = document.getElementById("timer");
      timeLeft = 120;
      timerDisplay.textContent = `Time left: ${timeLeft}s`;
  
      timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timer);
          showModal("You failed this task 💔", false);
        }
      }, 1000);
    }
  
    function showModal(message, success) {
      const modal = document.getElementById("modal");
      const modalText = document.getElementById("modal-message");
      modalText.textContent = message;
      modal.classList.remove("hidden");
  
      if (success) {
        setTimeout(() => {
          puzzleGrid.classList.add("hidden");
  
          const realImageContainer = document.createElement("div");
          realImageContainer.id = "real-image-container";
          realImageContainer.style.textAlign = "center";
          realImageContainer.style.marginTop = "30px";
  
          const realImage = document.createElement("img");
          realImage.src = "./assets/jigsaw.png";
          realImage.alt = "Love Image";
          realImage.style.width = "420px";
          realImage.style.border = "6px solid #ff69b4";
          realImage.style.borderRadius = "12px";
          realImage.style.boxShadow = "0 0 20px #ff80ab";
  
          realImageContainer.appendChild(realImage);
          document.body.appendChild(realImageContainer);
  
          setTimeout(() => {
            window.location.href = "./loader3.html";
          }, 5000);
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  });
  
