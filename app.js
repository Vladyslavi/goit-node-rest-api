import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config'
import authRouter from './routes/api/auth.js'
import contactsRouter from './routes/api/contacts.js';

// dotenv.config();


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

export default app;