import {Router} from 'express';
const router = Router();

import  {getAllUsers,getUserById,deleteUserById,upload,uploadImage,updateUser, getCurrentUser} from '../controllers/user.controller';
import {isAuthenticated} from '../middlewares/authjwt';


router.get('/all',isAuthenticated, getAllUsers);  //Admin
router.get('/:id',isAuthenticated, getUserById);    // Admin, Teacher, Student    
router.delete('/:id',isAuthenticated, deleteUserById);     //Admin, Teacher, Student
router.put('/update',isAuthenticated,updateUser); 
router.get('/current/profile',isAuthenticated, getCurrentUser)

router.put('/imageUpload/current', uploadImage,upload )


export default router;