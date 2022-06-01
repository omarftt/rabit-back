import {Router} from 'express';
const router = Router();

import {getHomeworks,
        createHomework,
        getHomeworkByClass,
        getHomeworkById,
        deleteHomeworkById,
        updateHomeworkById,
        getHomeworkByCreator,
        getHomeworkByStudent,
        upload,
        uploadImage} from '../controllers/homework.controller';
import {isAuthenticated} from '../middlewares/authjwt';

router.get('/all',isAuthenticated, getHomeworks);
router.post('/',isAuthenticated, createHomework);   //Teacher
router.get('/',isAuthenticated, getHomeworkByClass);   //Teacher and Student
router.get('/:listId', isAuthenticated, getHomeworkById); //Teacher and Student
router.delete('/:listId',isAuthenticated, deleteHomeworkById); //Teacher
router.put('/:listId',isAuthenticated, updateHomeworkById); //Teacher

router.get('/user/current',isAuthenticated, getHomeworkByCreator); //Teacher
router.get('/user/homework',isAuthenticated, getHomeworkByStudent); //Student')

router.put('/imageUpload/current', uploadImage,upload )




export default router;