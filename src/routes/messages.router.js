import { Router } from "express";
import { messagesManager } from '../dao/MongoManager/messages.manager.js'

const router = Router();

router.get("/", (req, res) => {
    res.render("chat");
});


export default router;