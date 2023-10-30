import { userModel } from "../models/users.model.js";
import Manager from "./manager.js";

class UsersManager extends Manager{
    constructor(){
        super(userModel)
    }
}

export const userManager = new UsersManager();