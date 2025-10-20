import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Api } from '../../app/api/Api';
import { ApiContext } from '../../app/api/context/ApiContext';
import { AuthClient } from '../../app/api/infra/AuthClient';
import { RestClient } from '../../app/api/infra/RestClient';
import { SocketClient } from '../../app/api/infra/SocketClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const socketClient = SocketClient.create();
const api = Api.create(
  RestClient.create(window.location.origin),
  AuthClient.create(window.location.origin),
  socketClient,
);

const AllTheProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={api}>
        <Theme>
          <Outlet />
        </Theme>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const rootRoute = createRootRoute({
    component: AllTheProviders,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',

    component: () => {
      return ui;
    },
  });

  const routerTree = rootRoute.addChildren([indexRoute]);
  const router = createRouter({
    routeTree: routerTree,
    defaultPendingMinMs: 0,
    defaultPendingMs: 0,
  });

  return render(<RouterProvider router={router} />, { ...options });
};

export * from '@testing-library/react';
export { api, queryClient, customRender as render, socketClient };
