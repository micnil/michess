import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import '@radix-ui/themes/styles.css';
import { RouterProvider } from '@tanstack/react-router';
import * as ReactDOM from 'react-dom/client';
import './global.css';
import { router } from './router';

initializeFaro({
  url: import.meta.env.VITE_FARO_URL || '',
  sessionTracking: {
    samplingRate: 0.8,
  },
  app: {
    name: 'web-app',
    version: '1.0.0',
    environment: import.meta.env.MODE ?? 'development',
  },

  instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<RouterProvider router={router} />);
