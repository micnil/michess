/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@michess/be-utils';
import * as nodemailer from 'nodemailer';
import { SendMailOptions, Transporter } from 'nodemailer';
import { EmailConfig } from './model/EmailConfig';
import { EmailMessage } from './model/EmailMessage';

const nodeMailerLogger = logger.child({ component: 'EmailClient' });

export class EmailClient {
  private transporter: Transporter;
  private defaultFrom: string;

  constructor(config: EmailConfig, defaultFrom: string) {
    this.defaultFrom = defaultFrom;
    this.transporter = nodemailer.createTransport({
      logger: {
        info: (...args: any[]) => nodeMailerLogger.info(args),
        error: (...args: any[]) => nodeMailerLogger.error(args),
        debug: (...args: any[]) => nodeMailerLogger.debug(args),
        fatal: (...args: any[]) => nodeMailerLogger.error(args),
        warn: (...args: any[]) => nodeMailerLogger.warn(args),
        trace: (...args: any[]) => nodeMailerLogger.trace(args),
        level: (level) => (nodeMailerLogger.level = level),
      },
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
