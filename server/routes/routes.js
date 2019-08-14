import express from 'express';
import Auth from '../middleware/auth';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multerConfig';
import Validator from '../middleware/validator';
import AuthController from '../controller/AuthController';
import propertyController from '../controller/propertyController';
import userController from '../controller/userController';
import flagController from '../controller/flagController';

const router = express.Router();
router.use(express.json());

router.post('/auth/signup', Validator.validateSignUpDetails, AuthController.create);
router.post('/auth/signin', Validator.validateLoginDetails, AuthController.login);
router.patch('/users/:id/set-admin', Auth.verifyToken, Auth.isAdmin, userController.setAdmin);
router.post('/property', Auth.verifyToken, cloudinaryConfig, multerUploads, Validator.validatePropertyPostFields, propertyController.postAdvert);
router.patch('/property/:id', Auth.verifyToken, cloudinaryConfig, multerUploads, Validator.validateIdParameter, propertyController.updateAdvert);
router.patch('/property/:id/sold', Auth.verifyToken, Validator.validateIdParameter, propertyController.markSold);
router.get('/property/', propertyController.allAdvert);
router.get('/property/:id', Validator.validateIdParameter, propertyController.getAdvert);
router.delete('/property/:id', Auth.verifyToken, Validator.validateIdParameter, propertyController.deleteAdvert);
router.post('/flag', Validator.validateFlagFields, flagController.postFlag);
router.get('/flags', Auth.verifyToken, Auth.isAdmin, flagController.getAllFlag);
router.get('/flags/:id', Auth.verifyToken, Auth.isAdmin, Validator.validateIdParameter, flagController.getAFlag);


export default router;
