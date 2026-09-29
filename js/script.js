//1. Menu hamburger (mobile)
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

//Tutup menu setelah link diklik
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

//2. Tema gelap / terang
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || "light");

themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

//3. Efek mengetik di hero
const words = ["Figma", "HTML", "CSS", "JavaScript"];
const typingEl = document.getElementById("typing");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = words[wordIndex];
  typingEl.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 110);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1200);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

//4. Bar keahlian terisi saat terlihat
const bars = document.querySelectorAll(".bar-fill");
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + "%";
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach((bar) => barObserver.observe(bar));

//5. Filter proyek
const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.filter;
    cards.forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.classList.toggle("hide", !match);
    });
  });
});

//6. Validasi form kontak
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");

function showError(id, message) {
  const input = document.getElementById(id);
  document.getElementById(id + "Error").textContent = message;
  input.parentElement.classList.toggle("invalid", message !== "");
  return message === "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  success.textContent = "";

  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const pesan = form.pesan.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const okNama = showError("nama", nama.length < 3 ? "Nama minimal 3 karakter." : "");
  const okEmail = showError("email", !emailPattern.test(email) ? "Masukkan email yang valid, misalnya nama@email.com." : "");
  const okPesan = showError("pesan", pesan.length < 10 ? "Pesan minimal 10 karakter." : "");

  if (okNama && okEmail && okPesan) {
    success.textContent = "Pesan terkirim. Terima kasih, " + nama + ".";
    form.reset();
  }
});

//7. Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();
