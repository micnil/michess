/* eslint-disable @typescript-eslint/no-explicit-any */
import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2';
import { logger } from '@michess/be-utils';
import * as nodemailer from 'nodemailer';
import { SendMailOptions, Transporter } from 'nodemailer';
import { Logger } from 'nodemailer/lib/shared';
import { EmailConfig } from './model/EmailConfig';
import { EmailMessage } from './model/EmailMessage';

const nodeMailerLogger = logger.child({ component: 'EmailClient' });

export class EmailClient {
  private transporter: Transporter;
  private defaultFrom: string;

  constructor(config: EmailConfig, defaultFrom: string) {
    this.defaultFrom = defaultFrom;
    const logger: Logger = {
      info: (...args: any[]) => nodeMailerLogger.info(args),
      error: (...args: any[]) => nodeMailerLogger.error(args),
      debug: (...args: any[]) => nodeMailerLogger.debug(args),
      fatal: (...args: any[]) => nodeMailerLogger.error(args),
      warn: (...args: any[]) => nodeMailerLogger.warn(args),
      trace: (...args: any[]) => nodeMailerLogger.trace(args),
      level: (level) => (nodeMailerLogger.level = level),
    };
    if (config.transportType === 'smtp') {
      this.transporter = nodemailer.createTransport({
        logger,
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        auth: {
          user: config.smtp.auth.user,
          pass: config.smtp.auth.pass,
        },
      });
    } else {
      const sesClient = new SESv2Client({
        logger,
        region: config.ses.region,
        credentials: {
          accessKeyId: config.ses.accessKeyId,
          secretAccessKey: config.ses.secretAccessKey,
        },
      });
      this.transporter = nodemailer.createTransport({
        SES: { sesClient, SendEmailCommand },
      });
    }
  }

  async sendEmail(message: EmailMessage): Promise<void> {
    const mailOptions: SendMailOptions = {
      sender: message.from || this.defaultFrom,
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
