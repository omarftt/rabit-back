import {Router} from 'express';
const router = Router();

import {createTaller,
        getTalleres,
        getTallerById,
        deleteTallerById,
        updateTallerById,
        getTallerByUser,
        enrollTaller,
        unenrollTaller,
        upload,
        uploadImage} from '../controllers/taller.controller';
import {isAuthenticated} from '../middlewares/authjwt';

router.post('/',isAuthenticated, createTaller);  //Admin
router.get('/',isAuthenticated, getTalleres);   //Admin & Teacher
router.get('/:listId', isAuthenticated, getTallerById); //Admin, 
router.delete('/:listId',isAuthenticated, deleteTallerById); //Admin
router.put('/:listId',isAuthenticated, updateTallerById); //Admin

router.get('/user/unique',isAuthenticated, getTallerByUser); //Teacher
router.put('/enroll/current/:tallerId',isAuthenticated, enrollTaller);  //Teacher
router.put('/unenroll/:tallerId',isAuthenticated, unenrollTaller);  //Teacher

router.put('/imageUpload/current', uploadImage,upload )


export default router; 