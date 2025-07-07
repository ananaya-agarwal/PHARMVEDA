document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const inputField = document.getElementById("chat-input");
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage("user", message);
  inputField.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    appendMessage("bot", data.reply);
  } catch (err) {
    appendMessage("bot", "⚠️ Failed to get a response from AI.");
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-window");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${sender}`;
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
