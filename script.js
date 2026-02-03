// CONTAGEM REGRESSIVA
const eventDate = new Date("2026-02-07T20:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  const timer = document.getElementById("timer");
  if (timer) {
    timer.innerText = `${days}d ${hours}h ${minutes}m`;
  }
}, 1000);

// ANIMAÇÃO DO LINE-UP (INDEX)
document.querySelectorAll(".showcase .game-card")
  .forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });


// FORMULÁRIO
const form = document.getElementById("gameForm");

if (form) {
  const cards = document.querySelectorAll(".game-card");

  cards.forEach(card => {
    const checkbox = card.querySelector("input[type=checkbox]");
    if (!checkbox || checkbox.disabled) return;

    card.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      card.classList.toggle("selected", checkbox.checked);
    });
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const selected = [];
    document.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
      if (cb.value) selected.push(cb.value);
    });

    document.getElementById("games").value = selected.join(", ");

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSdy5jOX4v14FiBu0o2RJ2sENtXWs8BFgeqO5HzX8RSh9Pi8dQ/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form)
      }
    );

    setTimeout(() => {
      window.location.href = "https://discord.gg/7GuBDckV";
    }, 1000);
  });
}
