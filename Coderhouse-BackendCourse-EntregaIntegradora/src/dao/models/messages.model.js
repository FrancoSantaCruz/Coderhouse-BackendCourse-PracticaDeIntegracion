import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    autor: {
        type: Schema.Types.ObjectId,
        // Hace referencia al ID del esquema Usuario.
        ref: "Usuario"
        // Esquema usuario
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const messagesSchema = new Schema({
    // chats: {
    //     type: [{userEmail : String, message: String}],
    //     require: true,
    // }
    // userEmail: franco@hotmail, message: "Hola"

    chats: {
        type: [chatSchema],
        default: []
    },


})

export const messagesModel = model('Messages', messagesSchema)
