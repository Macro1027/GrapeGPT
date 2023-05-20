const controller = new AbortController();

const textElement = document.getElementById("text-input")
const titleEl = document.getElementById('msgtitle');
const models = {
  'gptturbo': 'gpt-turbo-3.5',
  'dalle': 'DALL-E'
};

let curModel = 'gptturbo'

textElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      addUserMessage()
  }
})


async function goToPage(route) {
    console.log(`redirecting to ${route}`)
    window.location.href = `${window.location.origin}/${route}`;
    

}


// MESSAGES

function addUserMessage() {
  const curMessages = document.getElementById(curModel)
    const messageContainer = document.createElement('div');
    const textInput = textElement.value;

    textElement.value = "";
    messageContainer.classList.add('chat-bubble', 'user-message');
    messageContainer.textContent = textInput;
  
    curMessages.appendChild(messageContainer);

    gptRequest(textInput, curModel)
    scrollToBottom()
  }
  

function addBotMessage(text, curMessage) {
    const curMessages = document.getElementById(curMessage)
    const messageContainer = document.createElement('div');

    messageContainer.classList.add('chat-bubble', 'bot-message');
    messageContainer.textContent = text
  
    curMessages.appendChild(messageContainer);

    scrollToBottom()
}


function clearContext() {
    const curMessages = document.getElementById(curModel)

    const childElements = curMessages.querySelectorAll(':scope > *')
    const lastChildElement = childElements[childElements.length - 1];

    if (childElements.length == 0 || lastChildElement.classList.contains('border-container') == false) {
        const messageContainer = document.createElement('div');
        const curMessages = document.getElementById(curModel)

        messageContainer.classList.add('border-container');

        const borderLeft = document.createElement('div');
        borderLeft.classList.add('border-top', 'border-secondary', 'border-elem');

        const borderRight = document.createElement('div');
        borderRight.classList.add('border-top', 'border-secondary', 'border-elem');

        const borderTextElement = document.createElement('span');
        borderTextElement.classList.add('border-text')
        borderTextElement.textContent = 'context cleared'

        messageContainer.appendChild(borderLeft)
        messageContainer.appendChild(borderTextElement)
        messageContainer.appendChild(borderRight)

        curMessages.appendChild(messageContainer)

        controller.abort()

        clearGPT()
        scrollToBottom()
    }
}

function scrollToBottom() {
    const curMessages = document.getElementById(curModel)

    curMessages.scrollTop = curMessages.scrollHeight;
}

function showOnly(id) {
  for (const model of Object.keys(models)) {
    allModel = document.getElementById(model)
    allModel.style.display = 'none';
  }

  msgsToShow = document.getElementById(id);
  msgsToShow.style.display = 'flex';

  curModel = id;
  titleEl.textContent = models[id]
  
}


// GPT
async function gptRequest(textInput, curMessage) {
    const data = {
      message: textInput,
      mode: curModel
    };

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        addBotMessage(jsonResponse.output, curMessage)
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

async function clearGPT() {
    const data = {
      message: "none",
      mode: "clear"
    };

    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }
