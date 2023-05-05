import "./globals.css";
import Header from "@/components/Header";
import Notification from "@/components/Notification";
import { Providers } from "./GlobalState/Provider";

export const metadata = {
  title: "Blog",
  description: "Blog dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <section className="flex w-full">
          <Providers>
            <Notification />
            <div className="w-full">
              <Header />
              <main>{children}</main>
            </div>
          </Providers>
        </section>
      </body>
    </html>
  );
}
