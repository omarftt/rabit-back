import {Router} from 'express';
const router = Router();

import {createProduct,
        getProducts,
        getProductById,
        updateProductById,
        deleteProductById,
        uploadImageFront,
        uploadImageModal,
        uploadFront,
        uploadModal} from '../controllers/products.controller';
import {isAuthenticated} from '../middlewares/authjwt';

router.post('/',isAuthenticated, createProduct);  //Admin
router.get('/',isAuthenticated, getProducts);  //Admin
router.get('/:listId', isAuthenticated, getProductById);  //Admin
router.delete('/:listId',isAuthenticated, deleteProductById);  //Admin
router.put('/:listId',isAuthenticated, updateProductById);  //Admin

router.put('/imageUpload/imgfront', uploadImageFront,uploadFront )
router.put('/imageUpload/imgmodal', uploadImageModal,uploadModal ) 

export default router;