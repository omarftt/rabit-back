import {Router} from 'express';
const router = Router();

import {signIn,signUp,handleLogout} from '../controllers/auth.controller';
import {handleRefreshToken} from '../controllers/refreshToken.controller';


router.post('/login',signIn)
router.post('/register',signUp)
router.get('/refresh',handleRefreshToken)
router.get('/logout',handleLogout)

export default router;