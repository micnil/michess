import { Color } from '@michess/core-board';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ApiProvider } from './app/api/context/ApiProvider';
import { FooterArea } from './app/components/layout/FooterArea';
import { HeaderArea } from './app/components/layout/HeaderArea';
import { MainArea } from './app/components/layout/MainArea';
import { PageLayout } from './app/components/layout/PageLayout';
import { Logo } from './app/components/Logo';
import { Navbar } from './app/components/Navbar';
import GamePage from './app/pages/GamePage';
import { HomePage } from './app/pages/HomePage';

const RootLayout = () => (
  <PageLayout>
    <ApiProvider>
      <HeaderArea>
        <Navbar>
          <Logo />
        </Navbar>
      </HeaderArea>
      <MainArea>
        <Outlet />
      </MainArea>
      <FooterArea />
    </ApiProvider>
    <TanStackRouterDevtools />
  </PageLayout>
);

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function HomeComponent() {
    return <HomePage />;
  },
});

const gameWithIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game/$gameId/{-$side}',
  component: function GameWithIdComponent() {
    const { gameId, side } = gameWithIdRoute.useParams();
    return <GamePage gameId={gameId} side={side as Color} />;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, gameWithIdRoute]);
export const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
