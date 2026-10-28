const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );

    try {
        localStorage.setItem("theme", theme);
    } catch (e) {}
}

applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
});


const backToTop = document.getElementById("back-to-top");
const SHOW_AFTER = 300;

function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > SHOW_AFTER);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


const typedEl = document.getElementById("typed-text");
const fullText = document.querySelector(".typed-ghost").textContent;
const TYPE_SPEED = 110;
const START_DELAY = 400;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
    typedEl.textContent = fullText;
    typedEl.classList.add("done");
} else {
    let index = 0;

    function typeNextLetter() {
        if (index < fullText.length) {
            typedEl.textContent += fullText.charAt(index);
            index++;
            setTimeout(typeNextLetter, TYPE_SPEED);
        } else {
            setTimeout(function () {
                typedEl.classList.add("done");
            }, 1500);
        }
    }

    setTimeout(typeNextLetter, START_DELAY);
}
