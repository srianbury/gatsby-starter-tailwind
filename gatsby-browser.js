import * as React from "react";
import { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import awsExports from "./src/aws-exports";
import { LoginModal } from "./src/components/LoginModal";
import { NavDrawer } from "./src/components/NavDrawer";
import { getTheme } from "./src/styles";
import { GlobalErrorBoundry } from "./src/components/ErrorBoundary";
import "./src/styles/global.css";
import { WrappedRootElement } from "./src/components/WrappedRootElement";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Amplify.configure(awsExports);

// styles here
const wrapPageElement = ({ element }) => (
  <div className={`${isMobile ? "mobile-fix-100vh" : "h-screen"}`}>
    <Themer>
      <CssBaseline />
      <NavDrawer />
      <LoginModal />
      {element}
    </Themer>
  </div>
);

const Themer = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// context providers here
const wrapRootElement = ({ element }) => (
  <GlobalErrorBoundry>
    <WrappedRootElement element={element} />
  </GlobalErrorBoundry>
);

export { wrapPageElement, wrapRootElement };
