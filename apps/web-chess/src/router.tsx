import { Color } from '@michess/core-board';
import { Box, Container, Theme } from '@radix-ui/themes';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ApiProvider } from './app/api/context/ApiProvider';
import { Navbar } from './app/features/navbar/Navbar';
import GamePage from './app/pages/GamePage';
import { HomePage } from './app/pages/HomePage';

const RootLayout = () => (
  <Theme>
    <Box minHeight="100vh">
      <ApiProvider>
        <Container asChild>
          <header>
            <Navbar />
          </header>
        </Container>

        <Container asChild mt={'6'}>
          <main>
            <Outlet />
          </main>
        </Container>

        <Container asChild>
          <footer>{/* Footer content can be added here */}</footer>
        </Container>
      </ApiProvider>
      <TanStackRouterDevtools />
    </Box>
  </Theme>
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
