import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const userModel = model('Usuario', userSchema)