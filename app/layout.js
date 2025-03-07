import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./../components/ui/provider";
import Header from "./../components/Header";
import { UserProvider } from "./userContext";
import Footer from "./../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Linkfolio",
  description:
    "MyLinkFolio is a powerful personal portfolio website builder that helps freelancers, creators, and professionals showcase their projects, achievements, and social media links in one place. With customizable templates, SEO optimization, and mobile-friendly design, you can create a stunning online portfolio in minutes—no coding required. Build your professional brand today with MyLinkFolio!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Deepak Kumar(iQlipse)" />

        <meta
          name="google-site-verification"
          content="HPx5vK69OEaEtdb-ZCP2K-uk0peAOvpBZ0qqLUuJipA"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="LinkedIn portfolio, online portfolio, personal branding, job search, web portfolio, developer portfolio, freelancer portfolio"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          <main>
            <UserProvider>{children}</UserProvider>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
