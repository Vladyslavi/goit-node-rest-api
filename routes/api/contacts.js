import express from 'express';

import ctrl from '../../controllers/contacts.js';

import validateBody from '../../middlewares/validateBody.js';
import checkBody from '../../middlewares/checkBody.js';
import isValidId from '../../middlewares/isValidId.js';
import authenticate from '../../middlewares/authenticate.js';

import { schemas } from '../../models/contacts.js';

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
    '/',
    authenticate,
    checkBody,
    validateBody(schemas.addSchema),
    ctrl.addContact
);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.put(
    '/:id',
    authenticate,
    isValidId,
    checkBody,
    validateBody(schemas.addSchema),
    ctrl.updateContact
);

router.patch(
    '/:id/favorite',
    authenticate,
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateStatusContact
);

export default router;