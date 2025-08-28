import express  from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { postController } from '../controllers/postController.js';

const router = express.Router();

router.get("/:postId", protectRoute, postController.getPost )
router.post("/create", protectRoute, postController.createPost )


export default router;