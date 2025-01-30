const gamesForm = document.getElementById("games-form");

gamesForm.addEventListener("submit", handleSubmitGamesForm);

function handleSubmitGamesForm(event) {
  event.preventDefault();

  const formData = new FormData(gamesForm);
  const gamesData = Object.fromEntries(formData);
  console.log(gamesData);

  fetch("https://sql-6009.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gamesData),
  });
}

async function displaying() {
  const res = await fetch("https://sql-6009.onrender.com");
  const dataGotten = await res.json();
  displayGames(dataGotten);
}

displaying();


function displayGames(param) {
  param.forEach(singleGame => {
    const h2 = document.createElement("h2");
    const pTag = document.createElement("p");
    const div = document.createElement("div");

    h2.innerText = singleGame.game;
    pTag.innerText = singleGame.review;

    div.appendChild(h2);
    div.appendChild(pTag);

    app.appendChild(div);
  });
}