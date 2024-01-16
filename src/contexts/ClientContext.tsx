import { Client } from "client/Client";
import React from "react";

export const Context = React.createContext<{ client: Client }>(
  {} as { client: Client }
);

interface ClientProviderProps {
  client: Client;
  children: React.ReactNode;
}

export function ClientProvider({ children, client }: ClientProviderProps) {
  return <Context.Provider value={{ client }}>{children}</Context.Provider>;
}
