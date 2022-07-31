const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form')
const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log('Connected to Server!')
})

socket.addEventListener('message', (message) => {
    message.data.text().then(str => console.log(str))

    // console.log('New message: ', message.data.text())
})

socket.addEventListener('close', () => {
    console.log('Closed connection to Server')
})

function handleSubmit(e) {
    e.preventDefault();
    const input = messageForm.querySelector("input");
    console.log(input.value)
    socket.send(input.value);
    input.value = '';
}

messageForm.addEventListener('submit', handleSubmit)

