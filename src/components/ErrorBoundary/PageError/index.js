import * as React from "react";
import * as Sentry from "@sentry/react";
import { PageFallback } from "../PageFallback";

const PageErrorBoundry = ({ children }) => {
  function handleBeforeCapture(scope) {
    scope.setTag("appLevel", "global");
  }
  return (
    <Sentry.ErrorBoundary
      fallback={<PageFallback />}
      beforeCapture={handleBeforeCapture}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export { PageErrorBoundry };
