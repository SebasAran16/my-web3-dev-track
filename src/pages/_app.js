import "@/styles/globals.sass";
import MainLayout from "@/layouts/main-layout";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default appWithTranslation(App);
