import { Schema, model } from 'mongoose';
import Joi from 'joi';
import handleMongooseError from '../helpers/handleMongooseError.js';

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const userSchema = new Schema(
    {
        email: {
            type: String,
            match: emailRegex,
            required: [true, 'Set email for contact'],
            unique: true,
        },

        password: {
            type: String,
            minLength: 6,
            required: [true, 'Set password for contact'],
        },

        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },

        token: {
            type: String,
            default: '',
        },
        avatarURL: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
        'any.required': `Missing required email field`,
    }),

    password: Joi.string().min(6).required().messages({
        'any.required': `Missing required password field`,
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
        'any.required': `Missing required email field`,
    }),

    password: Joi.string().min(6).required().messages({
        'any.required': `Missing required password field`,
    }),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model('user', userSchema);

export default {
    User,
    schemas
};