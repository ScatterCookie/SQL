const messageForm = document.getElementById("message-form");

function handleSubmitMessageForm(event) {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const message = formData.get("message");

  fetch("https://sql-6009.onrender.com/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

messageForm.addEventListener("submit", handleSubmitMessageForm);
