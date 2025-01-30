const messageForm = document.getElementById("message-form");

function handleSubmitMessageForm(event) {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const messages = Object.fromEntries("message");

  fetch("https://sql-6009.onrender.com/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

messageForm.addEventListener("submit", handleSubmitMessageForm);
