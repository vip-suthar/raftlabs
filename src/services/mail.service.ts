import nodemailer, { Transporter } from 'nodemailer';
import { mailConfig } from '../config';
import Mail from 'nodemailer/lib/mailer';

const connectMailService = async (): Promise<boolean> => {
    try {

        // If service is already connected
        if(mailConfig.SERVICE.connected) return true;

        // if some error occured while connecting the service
        if(mailConfig.SERVICE.error) return false;

        /* Creating a transporter object that will be used to send emails. */
        const transporter: Transporter<Mail.Options> = nodemailer.createTransport({
            port: mailConfig.PORT,
            host: "smtp.gmail.com",
            auth: {
                user: mailConfig.AUTH_EMAIL,
                pass: mailConfig.AUTH_PASSWORD,
            },
            secure: true,
        });

        await transporter.verify();

        console.log("Email Service Connected Successfully");

        mailConfig.SERVICE.connected = true;
        mailConfig.SERVICE.instance = transporter;

        return true;

    } catch (err: any) {
        console.log(`Some error occured while connecting mail service: ${err.message}`);

        mailConfig.SERVICE.connected = false;
        mailConfig.SERVICE.instance = null;

        return false;
    }
}

export default connectMailService;