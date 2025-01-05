"use client";
import { NextUIProvider } from "@nextui-org/react";
import "@/src/styles/globals.css";
import AuthProvider from "@/src/providers/auth-provider";
import PrivateRoute from "@/src/providers/private-route";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>
          {
            <NextUIProvider>
              <AuthProvider>
                <PrivateRoute>{children}</PrivateRoute>
              </AuthProvider>
            </NextUIProvider>
          }
        </main>
      </body>
    </html>
  );
}
