import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Header from "@/components/header/header";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider signInForceRedirectUrl="/tasks" signUpForceRedirectUrl="/tasks">
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
