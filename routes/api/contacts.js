import express from 'express';

import ctrl from '../../controllers/contacts.js';

import validateBody from '../../middlewares/validateBody.js';
import checkBody from '../../middlewares/checkBody.js';
import isValidId from '../../middlewares/isValidId.js';

import { schemas } from '../../models/contact.js';

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

const Contacts = model('contact', contactSchema);

export const schemas = {
    Contacts,
    addContact,
    updateFavoriteSchema
};