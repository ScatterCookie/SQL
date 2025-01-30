const gamesForm = document.getElementById("games-form");

function handleSubmitMessageForm(event) {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const games = formData.get("games");

  fetch("https://sql-6009.onrender.com/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(games),
  });
}

messageForm.addEventListener("submit", handleSubmitMessageForm);
