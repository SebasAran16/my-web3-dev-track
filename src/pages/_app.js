import "@/styles/globals.sass";
import MainLayout from "@/layouts/main-layout";
import { appWithTranslation } from "next-i18next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import LenisProvider from "@/providers/LenisProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";

function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <LenisProvider>
      <ScrollProgressBar />
      {getLayout(<Component {...pageProps} />)}
      <SpeedInsights />
    </LenisProvider>
  );
}

export default appWithTranslation(App);
