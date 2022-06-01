import {Router} from 'express';
const router = Router();

import {getClassrooms,
        createClassroom,
        getClassroomByTaller,
        getClassroomById,
        deleteClassroomById,
        updateClassroomById,
        getClassroomByUser,
        enrollClassroom,
        unenrollClassroom} from '../controllers/classroom.controller';
import {isAuthenticated} from '../middlewares/authjwt';

router.get('/all',isAuthenticated, getClassrooms);  //Admin')
router.post('/',isAuthenticated, createClassroom);   //Teacher
router.get('/',isAuthenticated, getClassroomByTaller);   //Teacher
router.get('/:listId', isAuthenticated, getClassroomById); //Teacher
router.delete('/:listId',isAuthenticated, deleteClassroomById); //Teacher
router.put('/:listId',isAuthenticated, updateClassroomById); //Teacher

router.get('/user/current',isAuthenticated, getClassroomByUser); //Student
router.put('/enroll/current',isAuthenticated, enrollClassroom); //Student
router.put('/unenroll/:listId',isAuthenticated, unenrollClassroom);  //Student


export default router;