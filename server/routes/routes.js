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
router.post('/property', Auth.verifyToken, cloudinaryConfig, multerUploads, propertyController.postAdvert);

export default router;
