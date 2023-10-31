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

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

// Handlebars

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');


const httpServer = app.listen(8080, () => {
    console.log("Listening server on port 8080. \nhttp://localhost:8080/ ");
});

const socketServer = new Server(httpServer);

// Routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', messagesRouter);

// WebSocket Message
socketServer.on("connection", (socket) => {
    let userFound
    socket.on("newUser", async (user) => {

        userFound = await validator(user[1])
        userFound = userFound[0]
        if(!userFound){
            let obj = {
                name: user[0],
                email: user[1],
                password: user[2] 
            }
            userManager.createOne(obj)
            socket.broadcast.emit("newUserBroadcast", user[0])
        } else {
            // No hago uso de createOne porque el usuario ya existe
            // Pero si hago el emit siguiendo el flujo del websocket
            socket.broadcast.emit("newUserBroadcast", userFound)
        }
    })
    
    socket.on("message", async (info) => {
        // guardar el mensaje del usuario.
        let chat = [
            {
                autor: userFound._id,
                content: info.message,
                date: new Date()
            }
        ]
        console.log(chat)
        const res = await messagesManager.createOne(chat) 
        console.log(res)
        socketServer.emit("chat", chat);
    })
})

async function validator(email){
    const users = await userManager.findAll()
    let user = users.filter( user => user.email == email)
    return user
}