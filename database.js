
import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const accessCollection = async () => {
    try {
        const collection = database.collection('TinyURL');

    } catch (error) {
        console.error('An error occurred while accessing the collection', error);
    }
};

export { connectDB, accessCollection };
