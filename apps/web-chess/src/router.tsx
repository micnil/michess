import { Color } from '@michess/core-board';
import { Box, Container, Flex, Theme } from '@radix-ui/themes';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ApiProvider } from './app/api/context/ApiProvider';
import { Logo } from './app/components/Logo';
import { Navbar } from './app/components/Navbar';
import GamePage from './app/pages/GamePage';
import { HomePage } from './app/pages/HomePage';

const RootLayout = () => (
  <Theme>
    <Box minHeight="100vh">
      <ApiProvider>
        <header>
          <Container>
            <Navbar>
              <Logo />
            </Navbar>
          </Container>
        </header>

        <Container asChild>
          <main>
            <Flex direction="column" align="center" justify="center">
              <Outlet />
            </Flex>
          </main>
        </Container>

        <Container size="4" px={{ initial: '2', md: '4' }} py="2" asChild>
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
