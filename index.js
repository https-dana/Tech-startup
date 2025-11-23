document.addEventListener("DOMContentLoaded", () => {
  typeMotto();
  applyNightThemeIfNeeded();
  initRiddlePopup();
});

window.addEventListener("load", () => {
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  if (header && main) {
    main.style.marginTop = header.offsetHeight + "px";
  }
});


/*Самодрук девізу під назвою */
function typeMotto() {
  const mottoEl = document.getElementById("motto");
  if (!mottoEl) return;

  const text = "Інновації без меж";
  let index = 0;

  const intervalId = setInterval(() => {
    mottoEl.textContent += text.charAt(index);
    index++;
    if (index >= text.length) {
      clearInterval(intervalId);
    }
  }, 80);
}

/*Нічний режим */
function applyNightThemeIfNeeded() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 21 || hours < 6) {
    document.body.classList.add("night-theme");
  }
}

/*Вікно з загадкою від засновника*/
function initRiddlePopup() {
  const founderImages = document.querySelectorAll(".founder-img");
  if (!founderImages.length) return;

  const overlay = createRiddleModal();

  founderImages.forEach(img => {
    img.addEventListener("mouseenter", () => openRiddleModal(img, overlay));
    img.addEventListener("click", () => openRiddleModal(img, overlay));
  });
}

function createRiddleModal() {
  const overlay = document.createElement("div");
  overlay.id = "riddle-overlay";
  overlay.className = "riddle-overlay";

  const modal = document.createElement("div");
  modal.id = "riddle-modal";
  modal.className = "riddle-modal";

  const title = document.createElement("h3");
  title.textContent = "Загадка від засновника";

  const riddleText = document.createElement("p");
  riddleText.id = "riddle-text";

  const answerInput = document.createElement("input");
  answerInput.type = "text";
  answerInput.id = "riddle-answer";
  answerInput.placeholder = "Ваша відповідь";

  const buttonsRow = document.createElement("div");
  buttonsRow.style.display = "flex";
  buttonsRow.style.justifyContent = "space-between";
  buttonsRow.style.marginTop = "10px";

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "Перевірити";
  checkBtn.className = "btn-check";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Закрити";
  closeBtn.className = "btn-close";

  const message = document.createElement("p");
  message.id = "riddle-message";

  buttonsRow.appendChild(checkBtn);
  buttonsRow.appendChild(closeBtn);

  modal.appendChild(title);
  modal.appendChild(riddleText);
  modal.appendChild(answerInput);
  modal.appendChild(buttonsRow);
  modal.appendChild(message);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      overlay.classList.remove("show");
    }
  });

  /* Перевірка відповіді */
  checkBtn.addEventListener("click", () => {
    const correct = modal.dataset.correctAnswer?.toLowerCase().trim();
    const userAnswer = document.getElementById("riddle-answer").value.toLowerCase().trim();
    const messageEl = document.getElementById("riddle-message");

    if (!correct) return;

    if (userAnswer === correct) {
      messageEl.textContent = "✅ Відповідь вірна!";
      messageEl.style.color = "green";
    } else {
      messageEl.textContent = "❌ Спробуйте ще!";
      messageEl.style.color = "red";
    }
  });

  return overlay;
}

function openRiddleModal(img, overlay) {
  const modal = overlay.querySelector("#riddle-modal");
  const riddleTextEl = overlay.querySelector("#riddle-text");
  const answerInput = overlay.querySelector("#riddle-answer");
  const message = overlay.querySelector("#riddle-message");

  const riddle = img.dataset.riddle || "Моя загадка...";
  const answer = img.dataset.answer || "";

  riddleTextEl.textContent = riddle;
  modal.dataset.correctAnswer = answer;

  answerInput.value = "";
  message.textContent = "";

  overlay.classList.add("show");
  answerInput.focus();
}
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
});

/*Перемикач світлої/темної теми*/
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");

  // 1. Якщо користувач раніше вибрав тему — застосувати її
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.toggle("night-theme", savedTheme === "dark");
    toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  } else {
    // Якщо користувач не задавав — діє авто-ніч
    toggleBtn.textContent = document.body.classList.contains("night-theme") ? "☀️" : "🌙";
  }

  // 2. Обробник кліку
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("night-theme");

    const isDark = document.body.classList.contains("night-theme");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";

    // 3. Запам'ятати вибір
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
