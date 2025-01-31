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

async function fetchData() {
  const res = await fetch("https://sql-6009.onrender.com");
  const dataGotten = await res.json();
  displayGames(dataGotten);
}

function displayGames(param) {
  const gameListContainer = document.getElementById("comment-container")
  gameListContainer.innerHTML = ''
  param.forEach(singleGame => {
    const h2 = document.createElement("h2");
    const pTag = document.createElement("p");
    const div = document.createElement("div");
    const deleteButton = document.createElement('button')

    console.log(singleGame);

    h2.innerText = singleGame.game;
    pTag.innerText = singleGame.review;
    deleteButton.innerText = 'Delete Review'

    deleteButton.addEventListener('click', function() {
      handleDelete(singleGame.id)
    })
    
    div.appendChild(h2);
    div.appendChild(pTag);
    div.appendChild(deleteButton)

    gameListContainer.appendChild(div);
  });
}

fetchData();

async function handleDelete(id) {
  const res = await fetch(`https://sql-6009.onrender.com/${id}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    fetchData()
  }
}