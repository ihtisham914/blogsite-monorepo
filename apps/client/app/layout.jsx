import "./globals.css";
import Header from "@/components/Header";
import Notification from "@/components/Notification";
import { Providers } from "./GlobalState/Provider";

export const metadata = {
  title: "Blogify",
  description: "Blogify client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <section className="flex w-full">
          <Providers>
            <Notification />
            <div className="w-full">
              <Header />
              <main className="mx-auto px-4 max-w-screen-lg">{children}</main>
            </div>
          </Providers>
        </section>
      </body>
    </html>
  );
}
