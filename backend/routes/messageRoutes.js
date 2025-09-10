import express  from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { messageController } from '../controllers/messageController.js';


const router = express.Router();


router.post("/", protectRoute, messageController.sentMessage)


export default router;