import HttpError from '../helpers/HttpError.js';

const checkBody = (req, res, next) => {
    const { body } = req;
    if (Object.keys(body).length === 0) {
        throw new HttpError(400, 'missing fields');
    }
    next();
};

export default checkBody;