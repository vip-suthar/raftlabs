import mongoose, { ConnectOptions } from 'mongoose';

import { dbConfig } from '../config';

const connectDBService = async (): Promise<boolean> => {
    try {

        // If service is already connected
        if(dbConfig.SERVICE.connected) return true;

        // if some error occured while connecting the service
        if(dbConfig.SERVICE.error) return false;

        // Connect to MongoDB
        const db = await mongoose.connect(dbConfig.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        console.log("MongoDB Connected!");

        dbConfig.SERVICE.connected = true;
        dbConfig.SERVICE.instance = db;

        return true;
    } catch (err: any) {
        console.log(`Some error occured while connecting database: ${err.message}`);

        dbConfig.SERVICE.connected = false;
        dbConfig.SERVICE.instance = null;

        return false;
    }
};

export default connectDBService;