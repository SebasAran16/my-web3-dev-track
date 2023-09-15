import "@/styles/globals.sass";
import MainLayout from "@/layouts/main-layout";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(App);
