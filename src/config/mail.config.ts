import { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

type MailConfig = {
    PORT: number,
    SMTP_HOST: string,
    AUTH_EMAIL: string,
    AUTH_PASSWORD: string,
    DEFAULT_EMAIL: string,
    SERVICE: {
        connected: boolean,
        error: boolean,
        instance: Transporter<Mail.Options> | null
    }
}

const configObj: MailConfig = {
    PORT: parseInt(process.env.MAIL_SERVICE_PORT || "") || 465,
    SMTP_HOST: process.env.MAIL_SERVICE_SMTP_HOST || "smtp.gmail.com",
    AUTH_EMAIL: process.env.MAIL_SERVICE_AUTH_EMAIL || "",
    AUTH_PASSWORD: process.env.MAIL_SERVICE_AUTH_PASSWORD || "",
    DEFAULT_EMAIL: process.env.MAIL_SERVICE_DEFAULT_EMAIL || "Admin<vipin29suthar@gmail.com>",
    SERVICE: {
        connected: false,
        error: false,
        instance: null
    }
}

export default configObj;