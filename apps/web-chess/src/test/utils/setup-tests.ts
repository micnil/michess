import { server } from '../mocks/node-chess';

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Stop MSW server after all tests
afterAll(() => {
  server.close();
});
