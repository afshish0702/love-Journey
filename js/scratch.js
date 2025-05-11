// Add a global flag
let shouldRedirectAfterModal = false;

const canvasElements = document.querySelectorAll('canvas');
const hiddenMessages = document.querySelectorAll('.message');
const buttons = document.querySelectorAll('.message button');

canvasElements.forEach((canvas, index) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let isDrawing = false;

  // Fill canvas with "scratch" layer (gray)
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mouse/touch drawing to erase
  function getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX || e.touches[0].clientX) - rect.left,
      y: (e.clientY || e.touches[0].clientY) - rect.top
    };
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Event listeners for drawing
  canvas.addEventListener('mousedown', () => { isDrawing = true; });
  canvas.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('touchstart', () => { isDrawing = true; });
  canvas.addEventListener('touchend', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const { x, y } = getMousePos(canvas, e);
    scratch(x, y);
    checkReveal();
  });
  canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getMousePos(canvas, e);
    scratch(x, y);
    checkReveal();
  }, { passive: false });

  function checkReveal() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clearedPixels = 0;
    for (let i = 0; i < imageData.length; i += 4) {
      if (imageData[i + 3] < 128) clearedPixels++;
    }
    const percent = clearedPixels / (canvas.width * canvas.height) * 100;

    if (percent > 60 && !canvas.classList.contains('hidden')) {
      canvas.classList.add('hidden');
      hiddenMessages[index].style.zIndex = 20;
      hiddenMessages[index].style.opacity = "1";
      hiddenMessages[index].style.pointerEvents = 'auto';

      // Trigger confetti
      triggerConfetti(canvas);
    }
  }
});

// Confetti fire
function triggerConfetti(canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight }
  });
}

// Open modal
function openModal(index) {
  const modal = document.getElementById('gifModal');
  const modalGif = document.getElementById('modalGif');
  const gifs = [
    './assets/gif1.gif',  // Replace with your actual GIF URLs
    './assets/gif2.gif',
    './assets/gif3.gif',
    './assets/gif4.gif',
    './assets/gif5.gif',
    './assets/gif6.gif',
    './assets/gif7.gif',
    './assets/gif8.gif',
    './assets/gif9.gif'
  ];

  modalGif.src = gifs[index];

  // Check if it's the 9th card (index 8)
  if (index === 8) {
    shouldRedirectAfterModal = true;
  } else {
    shouldRedirectAfterModal = false;
  }

  // Show modal
  modal.style.display = 'flex';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('gifModal');
  modal.style.display = 'none';

  // Redirect if flagged
  if (shouldRedirectAfterModal) {
    window.location.href = "./loader4.html"; // your next page
  }
}

// Button click handler
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    openModal(index);
  });
});