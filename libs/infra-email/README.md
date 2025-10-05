# infra-email

A simple email service library built on top of nodemailer.

## Usage

```typescript
import { EmailService, EmailConfig } from '@michess/infra-email';

// Configure the email service
const config: EmailConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
};

// Create an instance
const emailService = new EmailService(config, 'noreply@yourapp.com');

// Send an email
await emailService.sendEmail({
  to: 'recipient@example.com',
  subject: 'Hello World',
  text: 'Hello from the email service!',
  html: '<p>Hello from the email service!</p>',
});

// Verify connection
const isConnected = await emailService.verifyConnection();
```

## Features

- Simple EmailService class with nodemailer integration
- TypeScript support with proper type definitions
- Email configuration interface
- Connection verification
- Support for both text and HTML emails

## Building

Run `nx build infra-email` to build the library.

## Running unit tests

Run `nx test infra-email` to execute the unit tests via [Jest](https://jestjs.io).
