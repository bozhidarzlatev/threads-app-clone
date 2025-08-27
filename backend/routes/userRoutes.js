import express  from 'express';
import { userController } from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', userController.signupUser )
router.post('/login', userController.loginUser )
router.post('/logout', userController.logoutUser )
router.post('/follow/:id', protectRoute, userController.followUser )

export default router;