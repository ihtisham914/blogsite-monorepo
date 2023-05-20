import "./globals.css";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Notification from "@/components/Notification";
import { Providers } from "./GlobalState/Provider";
import { SkeletonTheme } from "react-loading-skeleton";

export const metadata = {
  title: "Blog",
  description: "Blog dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
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
        </SkeletonTheme>
      </body>
    </html>
  );
}
