import express from 'express';
import ctrl from '../../controllers/auth.js';
import validateBody from '../../middlewares/validateBody.js';
import checkBody from '../../middlewares/checkBody.js';
import authenticate from '../../middlewares/authenticate.js';
import { schemas } from '../../models/user.js';

const router = express.Router();

router.post(
    '/register',
    checkBody,
    validateBody(schemas.registerSchema),
    ctrl.register
);

router.post('/login', checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
    '/avatars',
    authenticate,
    upload.single('avatar'),
    ctrl.updateAvatar
);

export default router;