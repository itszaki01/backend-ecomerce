import nodemailer from 'nodemailer';
type Props ={
    to:string,
    text:string,
    subject:string
}

export async function sendEmail({to,text,subject}:Props) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: `"Affilita" <${process.env.SMTP_FROM_EMAIL}>`,
        to,
        subject,
        text,
    });
}
