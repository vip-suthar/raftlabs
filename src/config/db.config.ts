import mongoose from "mongoose";

type DBConfig = {
    CONNECTION_URI: string,
    SERVICE: {
        connected: boolean,
        error: boolean,
        instance: typeof mongoose | null
    }
}

const configObj: DBConfig = {
    CONNECTION_URI: process.env.DB_CONNECTION_URI || "",
    SERVICE: {
        connected: false,
        error: false,
        instance: null
    }
}

export default configObj;