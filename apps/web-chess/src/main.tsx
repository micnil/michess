import '@radix-ui/themes/styles.css';
import { RouterProvider } from '@tanstack/react-router';
import * as ReactDOM from 'react-dom/client';
import './global.css';
import { router } from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
