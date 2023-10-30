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
    socket.on("newUser", (user) => {
        socket.broadcast.emit("newUserBroadcast", user)
        // guardar el usuario en db
        userManager.createOne(user)
    })

    socket.on("message", (info) => {
        messages.push(info);
        // guardar el mensaje del usuario.
        messagesManager.createOne(info) 
        socketServer.emit("chat", messages);
    })
})