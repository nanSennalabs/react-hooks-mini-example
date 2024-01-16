import React from "react";
import { QueryClientProvider } from "react-query";

import { App } from "App";
import { ClientProvider } from "contexts/ClientContext";
import { client, queryClient } from "client/init";

export function Root() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClientProvider client={client}>
          <App />
        </ClientProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
