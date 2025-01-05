import { NextUIProvider } from "@nextui-org/react";
import "@/src/styles/globals.css";
export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{<NextUIProvider>{children}</NextUIProvider>}</main>
      </body>
    </html>
  );
}
