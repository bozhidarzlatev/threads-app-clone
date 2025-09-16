import express  from 'express';
import { userController } from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/profile/:query', userController.getUserProfile )
router.get('/suggested', protectRoute, userController.getSuggestedUsers )
router.post('/signup', userController.signupUser )
router.post('/login', userController.loginUser )
router.post('/logout', userController.logoutUser )
router.post('/follow/:id', protectRoute, userController.followUser )
router.put('/update/:id', protectRoute, userController.updateUser )

export default router;