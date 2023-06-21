'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

// wrapping every children with these providers
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

export default Providers;