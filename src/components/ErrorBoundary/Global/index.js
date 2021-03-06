import * as React from "react";
import * as Sentry from "@sentry/react";

const GlobalErrorBoundry = ({ children }) => {
  function handleBeforeCapture(scope) {
    scope.setTag("appLevel", "global");
  }
  return (
    <Sentry.ErrorBoundary
      fallback={({ error }) => {
        console.log({ error });
        return <div>Global Error Catch.</div>;
      }}
      beforeCapture={handleBeforeCapture}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export { GlobalErrorBoundry };
