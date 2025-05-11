const scroll = document.getElementById("scroll");
scroll.addEventListener("click", () => {
    scroll.classList.toggle("open");

    // Allow curtain opening first, then unroll the scroll after a delay
    if (scroll.classList.contains("open")) {
        setTimeout(() => {
            document.getElementsByClassName("curtainContainer")[0].style.transform = "translatex(-150vw)";
            document.getElementsByClassName("curtainContainer")[1].style.transform = "translatex(150vw)";
        }, 8000); // delay for curtain effect
    }
});