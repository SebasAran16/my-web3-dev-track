import styles from "@/styles/Thanks.module.sass";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ThanksLayout from "@/layouts/thanks-layout";

export default function Thanks() {
  const { t } = useTranslation("thanks");
  return (
    <section id={styles.thanksSection}>
      <div id={styles.thanksContent}>
        <h1>{t("title")}</h1>
        <h3>{t("subtitle")}</h3>
        <p>
          {t("backText")} <Link href="/">{t("anchor")}</Link>
        </p>
      </div>
    </section>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["header", "thanks"])),
  },
});

Thanks.getLayout = function getLayout(page) {
  return <ThanksLayout>{page}</ThanksLayout>;
};
