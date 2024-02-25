import HttpError from '../helpers/HttpError';

const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        next(HttpError(400, error.message));
    }
    next();
};

export default validateBody;