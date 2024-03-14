import { Schema, model } from 'mongoose';
import Joi from 'joi';
import handleMongooseError from '../helpers/handleMongooseError.js';


const nameRegex = '^[A-Z][a-z]+ [A-Z][a-z]+$';
const phoneRegex = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().pattern(new RegExp(nameRegex)).required().messages({
        'any.required': `Missing required name field`,
    }),

    email: Joi.string().required().messages({
        'any.required': `Missing required email field`,
    }),
    phone: Joi.string().pattern(new RegExp(phoneRegex)).required().messages({
        'any.required': `Missing required phone field`,
    }),

    favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean()
        .required()
        .messages({ 'any.required': `Missing field favorite` }),
});

const Contact = model('contacts', contactSchema);

export const schemas = {
    Contact,
    addSchema,
    updateFavoriteSchema
};