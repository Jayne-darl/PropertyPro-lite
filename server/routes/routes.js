import express from 'express';
import Auth from '../middleware/auth';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multerConfig';
import Validator from '../middleware/validator';
import userController from '../controller/userController';
import propertyController from '../controller/propertyController';

const router = express.Router();
router.use(express.json());

router.post('/auth/create', Validator.validateSignUpDetails, userController.create);
router.post('/auth/login', Validator.validateLoginDetails, userController.login);
router.post('/property', Auth.verifyToken, cloudinaryConfig, multerUploads, Validator.validatePropertyPostFields, propertyController.postAdvert);
router.patch('/property/:id', Auth.verifyToken, cloudinaryConfig, multerUploads, Validator.validateIdParameter, propertyController.updateAdvert);
router.patch('/property/:id/sold', Auth.verifyToken, Validator.validateIdParameter, propertyController.markSold);
router.get('/property/', propertyController.allAdvert);
// router.get('/property/:id', Validator.validateIdParameter, propertyController.getAdvert);
// router.delete('/property/:id', Auth.verifyToken, Validator.validateIdParameter, propertyController.deleteAdvert);


export default router;
