const gamesForm = document.getElementById("games-form");

function handleSubmitGamesForm(event) {
  event.preventDefault();

  const formData = new FormData(gamesForm);
  const gamesData = formData.get("games");

  fetch("https://sql-6009.onrender.com/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gamesData),
  });
}

function displayGames(param) {
  param.array.forEach((singleGame) => {
    const h2 = document.createElement("h2");
    const pTag = document.createElement("p");
    const div = document.createElement("div");

    h2.innerText = singleGame.games;
    pTag.innerText = singleGame.review;

    div.appendChild(h2);
    div.appendChild(pTag);

    app.appendChild(div);
  });
}

gamesForm.addEventListener("submit", handleSubmitGamesForm);
