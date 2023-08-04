import connectDBService from "../services/db.service";
import connectMailService from "../services/mail.service";

const connectServices = async ()=> {
    try {

        await connectDBService();
        await connectMailService();

    } catch (err: any) {

    }
};

export default connectServices;