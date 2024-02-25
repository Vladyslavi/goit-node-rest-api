import mongoose from 'mongoose';
import app from './app.js';

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

const startServer = async () => {
    try {
        await mongoose.connect(DB_HOST);
        console.log('Database connection successful');

        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

startServer();