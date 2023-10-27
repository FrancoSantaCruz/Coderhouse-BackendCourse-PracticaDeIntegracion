const socketClient = io()
// import { messagesManager } from "../../dao/MongoManager/messages.manager";

const username = document.getElementById("username");
const chatForm = document.getElementById("chatForm");
const chatMessage = document.getElementById("chatMessage");
const chat = document.getElementById("chat");

Swal.fire({
    title: "Bienvenidx!",
    text: "Ingresa tu email 😊",
    input: "text",
    confirmButtonText: "Enter",
    inputValidator: value => {
        if (!value) {
            return 'El nombre es un campo obligatorio 😢'
        }
    }
}).then(input => {
    user = input.value
    username.innerText = user
    socketClient.emit("newUser", user)
    // messagesManager.createOne({userEmail : user, message: {}})
})
socketClient.on('newUserBroadcast', (user) => {
    Toastify({
        text: `${user} se ha conectado`,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
});

chatForm.onsubmit = (e) => {
    e.preventDefault();

    const infoMessage = {
        name: user,
        message: chatMessage.value
    };
    socketClient.emit("message", infoMessage);
    // messagesManager.updateOne()
}

socketClient.on('chat', (messages) => {
    const chatMessage = messages.map( (message) => `<p>${message.name}: ${message.message}</p>` ).join(" ");
    chat.innerHTML = chatMessage;
})

// Validación del lado del front. 
// fetch('http://example.com/movies.json', {context})
//   .then(response => response.json())
//   .then(data => console.log(data));