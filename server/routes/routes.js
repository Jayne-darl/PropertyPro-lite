import express from 'express';
// import Auth from '../middleware/auth';
import Validator from '../middleware/validator';
import userController from '../controller/userController';

const router = express.Router();
router.use(express.json());

router.post('/auth/create', Validator.validateSignUpDetails, userController.create);
router.post('/auth/login', Validator.validateLoginDetails, userController.login);

export default router;
