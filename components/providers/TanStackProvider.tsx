"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanStackProviderProps {
  children: React.ReactNode;
}

const TanStackProvider = ({ children }: TanStackProviderProps) => {
  const [query] = useState(() => new QueryClient());

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};

export default TanStackProvider;
