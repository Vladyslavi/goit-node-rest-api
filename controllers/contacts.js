import { schemas } from '../models/contacts.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const listContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
        skip,
        limit,
    }).populate('owner', 'email');
    res.status(200).json(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await schemas.Contact.findById(id);
    if (!result) {
        throw new HttpError(404, 'Not found');
    }
    res.status(200).json(result);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await schemas.Contact.findByIdAndDelete(id);
    if (!result) {
        throw new HttpError(404, 'Not found');
    }
    res.json({
        message: 'contact deleted',
    });
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await schemas.Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw new HttpError(404, 'Not found');
    }
    res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
        throw new HttpError(400, 'missing field favorite');
    }

    const result = await schemas.Contact.findByIdAndUpdate(id, { favorite }, { new: true });

    if (!result) {
        throw new HttpError(404, 'Not found');
    }
    res.status(200).json(result);
};

export default {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};