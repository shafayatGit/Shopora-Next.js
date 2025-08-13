import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "Shopora",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {" "}
          <link
            rel="icon"
            href="https://i.ibb.co.com/0jhdPCFT/letter-s-9511678.png"
          />
        </Head>
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <Toaster />
          <AppContextProvider>{children}</AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
