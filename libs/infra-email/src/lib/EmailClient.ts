import * as nodemailer from 'nodemailer';
import { SendMailOptions, Transporter } from 'nodemailer';
import { EmailConfig } from './model/EmailConfig';
import { EmailMessage } from './model/EmailMessage';

export class EmailClient {
  private transporter: Transporter;
  private defaultFrom: string;

  constructor(config: EmailConfig, defaultFrom: string) {
    this.defaultFrom = defaultFrom;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendEmail(message: EmailMessage): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: message.from || this.defaultFrom,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}
