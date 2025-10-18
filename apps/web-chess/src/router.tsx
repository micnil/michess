import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { Box, Card, Container, Theme } from '@radix-ui/themes';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { ApiProvider } from './app/api/context/ApiProvider';
import { QueryProvider } from './app/api/context/QueryProvider';
import { BackgroundGradient } from './app/components/BackgroundGradient';
import { Navbar } from './app/features/navigation/Navbar';
import { EmailVerificationPage } from './app/pages/EmailVerificationPage';
import GamePage from './app/pages/GamePage';
import { HomePage } from './app/pages/HomePage';
import { PrivacyPolicyPage } from './app/pages/PrivacyPolicyPage';
import { RequestResetPasswordPage } from './app/pages/RequestResetPasswordPage';
import { ResetPasswordPage } from './app/pages/ResetPasswordPage';
import { SignInPage } from './app/pages/SignInPage';
import { SignUpPage } from './app/pages/SignUpPage';
import { WelcomePage } from './app/pages/WelcomePage';

const RootLayout = () => (
  <Theme
    accentColor="amber"
    appearance="dark"
    panelBackground="translucent"
    hasBackground={true}
    grayColor="sand"
    style={{
      minHeight: '100dvh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
    }}
  >
    <QueryProvider>
      <ApiProvider>
        <BackgroundGradient />
        <Box mb={'5'}>
          <Card asChild size={'1'}>
            <header>
              <Container>
                <Navbar />
              </Container>
            </header>
          </Card>
        </Box>

        <Container asChild minHeight="100%">
          <main>
            <Outlet />
          </main>
        </Container>
      </ApiProvider>
    </QueryProvider>
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

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game/local/{-$side}',
  component: function LocalGameComponent() {
    const { side } = gameRoute.useParams();
    return <GamePage side={side as Color} />;
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

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: function SignUpComponent() {
    return <SignUpPage />;
  },
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  validateSearch: (search): { referer?: string } => {
    return {
      referer: search.referer as string | undefined,
    };
  },
  component: function SignInComponent() {
    const { referer } = signinRoute.useSearch();
    return <SignInPage referer={referer} />;
  },
});

const emailVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/email-verification',
  validateSearch: (search) => {
    return {
      verificationError: search.error as string | undefined,
    };
  },
  component: function EmailVerificationComponent() {
    const { verificationError } = emailVerificationRoute.useSearch();
    return <EmailVerificationPage verificationError={verificationError} />;
  },
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: function RequestResetPasswordComponent() {
    return <RequestResetPasswordPage />;
  },
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  validateSearch: (search) => {
    return {
      token: search.token as string | undefined,
    };
  },
  component: function ResetPasswordComponent() {
    const { token } = resetPasswordRoute.useSearch();
    return <ResetPasswordPage token={token} />;
  },
});

const welcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/welcome',
  validateSearch: (search): { type?: Maybe<'social' | 'email'> } => {
    return {
      type: search.type as Maybe<'social' | 'email'>,
    };
  },
  component: function WelcomeComponent() {
    const { type } = welcomeRoute.useSearch();
    return <WelcomePage type={type} />;
  },
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: function PrivacyPolicyComponent() {
    return <PrivacyPolicyPage />;
  },
});

const routeTree = rootRoute.addChildren([
  signupRoute,
  signinRoute,
  indexRoute,
  gameRoute,
  gameWithIdRoute,
  emailVerificationRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  welcomeRoute,
  privacyPolicyRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
