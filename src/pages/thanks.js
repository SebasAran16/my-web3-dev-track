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
        <h1>Thanks for submitting form</h1>
        <h3>This might be the beginning of something big!</h3>
        <p>
          Go back to my portfolio <Link href="/">portfolio</Link>
        </p>
      </div>
    </section>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "footer",
      "header",
    ])),
  },
});

Thanks.getLayout = function getLayout(page) {
  return <ThanksLayout>{page}</ThanksLayout>;
};
