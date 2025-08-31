import { Hono } from 'hono';

const HonoApp = new Hono();
HonoApp.get('/', (c) => c.text('Hello Node.js!'));

export const App = HonoApp;
