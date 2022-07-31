const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message')
const nameForm = document.querySelector('#name')
const socket = new WebSocket(`ws://${window.location.host}`)

function makeMessageStringify(type, payload) {
    const message = {type, payload};
    return JSON.stringify(message)
}

socket.addEventListener("open", () => {
    console.log('Connected to Server!')
})

socket.addEventListener('message', (message) => {
    const li = document.createElement('li')
    li.innerText = message.data
    messageList.append(li);
    // console.log('New message: ', message.data.text())
})

socket.addEventListener('close', () => {
    console.log('Closed connection to Server')
})

function handleSubmit(e) {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessageStringify("new_message", input.value));
    input.value = '';
}

function handleNameSubmit(e) {
    e.preventDefault();
    const input = nameForm.querySelector('input');
    socket.send(makeMessageStringify("name", input.value));
    input.value='';    
}

messageForm.addEventListener('submit', handleSubmit)
nameForm.addEventListener('submit', handleNameSubmit)
