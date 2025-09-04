import express  from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { postController } from '../controllers/postController.js';

const router = express.Router();

router.get("/:postId",  postController.getPost )
router.get("/feed/get",  protectRoute,  postController.getFeedPost )
router.post("/create", protectRoute, postController.createPost )
router.post("/delete/:postId", protectRoute, postController.deletePost )
router.put("/like/:postId", protectRoute, postController.likeUnlikePost )
router.put("/reply/:postId", protectRoute, postController.replyPost )


export default router;