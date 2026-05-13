import "@/styles/globals.sass";
import MainLayout from "@/layouts/main-layout";
import { appWithTranslation } from "next-i18next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import LenisProvider from "@/providers/LenisProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Space_Mono } from "@next/font/google";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <div className={spaceMono.className}>
      <LenisProvider>
        <ScrollProgressBar />
        {getLayout(<Component {...pageProps} />)}
        <SpeedInsights />
      </LenisProvider>
    </div>
  );
}

export default appWithTranslation(App);
