import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import './db/config.js'
import { Server } from 'socket.io'

import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js';

import { messagesManager } from './dao/MongoManager/messages.manager.js';
import { userManager } from './dao/MongoManager/users.manager.js'
import { productsManager } from './dao/MongoManager/products.manager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Handlebars

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


const httpServer = app.listen(8080, () => {
    console.log("Listening server on port 8080. \nhttp://localhost:8080/ ");
});

const socketServer = new Server(httpServer);

// Routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', messagesRouter);


// ----------------------------- WebSocket ------------------------------------
socketServer.on("connection", (socket) => {


    // -------------------------USER SOCKET--------------------------------
    let userFound
    socket.on("newUser", async (user) => {

        userFound = await userValidator(user[1])
        userFound = userFound[0]
        if (!userFound) {
            let obj = {
                name: user[0],
                email: user[1],
                password: user[2]
            }
            userFound = await userManager.createOne(obj)
            socket.broadcast.emit("newUserBroadcast", user[0])
        } else {
            // No hago uso de createOne porque el usuario ya existe
            // Pero si hago el emit siguiendo el flujo del websocket
            socket.broadcast.emit("newUserBroadcast", userFound)
        }
    })
    // -------------------------------------------------------------
 


    // -----------------------CHAT SOCKET--------------------------------
    socket.on("message", async (info) => {
        
        // Creo un objeto con la misma estructura que el schema de message.
        let obj = {
            chats: [
                {
                    autor: userFound._id,
                    content: info.message,
                    date: new Date()
                }
            ]
        }

        // Valido si el chat existe en la DB
        let chatFound = await chatValidator(info.id)
        // Si no existe, crea un nuevo chat con el mensaje nuevo.
        // Si existe el chat, agrega a ese chat los mensajes.
        if(!chatFound){
            messagesManager.createOne(obj)
            // socketServer.emit("chat", obj);
        } else {
            chatFound.chats = [ ...chatFound.chats, ...obj.chats]
            messagesManager.updateOne(info.id, chatFound)
        }
        socketServer.emit("chat", chatFound.chats);
    })
    // -------------------------------------------------------------


    // -----------------------PRODUCTS SOCKET--------------------------------

    socket.on("product", async (product) => {
        await productsManager.createOne(product)

        const products = await productsManager.findAll()
        socketServer.emit("allProducts", products)
    })


})

async function userValidator(email) {
    const users = await userManager.findAll()
    let user = users.filter(user => user.email == email)
    return user
}

async function chatValidator(id) {
    const chats = await messagesManager.findAll()
    let chat = chats.filter(chat => chat._id == id)
    return chat[0]
}