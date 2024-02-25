import express from 'express';

import ctrl from '../../controllers/contacts';

import validateBody from '../../middlewares/validateBody';
import checkBody from '../../middlewares/checkBody';
import isValidId from '../../middlewares/isValidId';

import schemas from '../../models/contact';

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', checkBody, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put(
    '/:id',
    isValidId,
    checkBody,
    validateBody(schemas.addSchema),
    ctrl.updateContact
);

router.patch(
    '/:id/favorite',
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateStatusContact
);

export default router;