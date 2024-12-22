const chatForm = document.getElementById('chatForm');
const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');

// Function to append a message to the chat window
function appendMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', sender);
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();

  if (!message) return;

  // Append user message
  appendMessage(message, 'user');

  // Clear input
  userInput.value = '';

  try {
    // Send request to the API
    const response = await fetch('/main/testyourself', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });

    const result = await response.json();

    // Append bot response
    appendMessage(result.response || 'No response from AI.', 'bot');
  } catch (err) {
    appendMessage('Error communicating with the AI. Please try again.', 'bot');
  }
});
