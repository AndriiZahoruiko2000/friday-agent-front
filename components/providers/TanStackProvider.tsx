"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TanStackProviderProps {
  children: React.ReactNode;
}

const TanStackProvider = ({ children }: TanStackProviderProps) => {
  const [query] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={query}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
