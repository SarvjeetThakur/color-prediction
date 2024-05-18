import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/ui/footer";
import SocketProvidersValue from "@/context/socketContext";
import WalletProvidersValue from "@/context/walletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Predict the color",
  description: "Predict the color by me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SocketProvidersValue>
            <WalletProvidersValue>
              {children}
            </WalletProvidersValue>
          </SocketProvidersValue>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
