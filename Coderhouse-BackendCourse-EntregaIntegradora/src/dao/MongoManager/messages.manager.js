import {messagesModel} from '../models/messages.model.js'
import Manager from './manager.js';

class MessagesManager extends Manager{
    constructor(){
        super(messagesModel)
    }


}

export const messagesManager = new MessagesManager();

