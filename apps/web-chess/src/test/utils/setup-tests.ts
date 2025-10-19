import '@testing-library/jest-dom/vitest';
import { fetch } from 'cross-fetch';
import { server } from '../mocks/node-chess';
global.fetch = fetch;
vi.mock('socket.io-client', async () => {
  return {
    io: vi.fn(() => ({
      on: vi.fn(),
      emit: vi.fn(),
      emitWithAck: vi.fn(),
      off: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
    })),
  };
});
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
