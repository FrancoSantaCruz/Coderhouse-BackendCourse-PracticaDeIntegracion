import { Router } from "express";
import { messagesManager } from '../dao/MongoManager/messages.manager.js'

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const newChat = await messagesManager.createOne()
        res.redirect(`/chat/${newChat._id}`)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


export default router;