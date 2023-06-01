"use client";

import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageProvider } from "@/context/messages";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>{children}</MessageProvider>
    </QueryClientProvider>
  );
};

export default Layout
