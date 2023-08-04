import { Options } from 'nodemailer/lib/dkim';
import { mailConfig } from '../config';
import Mail from 'nodemailer/lib/mailer';

type MailData = {
    to: string | Array<string>,
    data: {
        subject: string,
        text?: string,
        html?: string
    },
    from?: string
}

function sendMail(
    mailData: MailData,
    callback = (err: Error | null, info: Mail.Options): void => { },
) {

    if (!mailConfig.SERVICE.connected) return;

    const dataObj = {
        from: mailData.from,  // sender address
        to: mailData.to,   // list of receivers
        subject: mailData.data.subject,
        text: mailData.data.text,
        html: mailData.data.html,
    };

    mailConfig.SERVICE.instance?.sendMail(dataObj, callback);

    // console.log("Error sending email");
}

export default sendMail;