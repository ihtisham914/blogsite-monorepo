import "./globals.css";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
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
            <Aside />
            <div className="pl-[200px] w-full">
              <Header />
              <main className="ml-8 mt-6 mr-8">{children}</main>
            </div>
          </Providers>
        </section>
      </body>
    </html>
  );
}
