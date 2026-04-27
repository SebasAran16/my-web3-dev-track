import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/CV.module.sass";
import CVDocument from "@/components/CVDocument";
import { cvWeb3Data, cvFullstackData } from "@/constants/cv";

const VARIANTS = {
  web3: { label: "Web3", data: cvWeb3Data },
  fullstack: { label: "Fullstack", data: cvFullstackData },
};

export default function CVPage() {
  const [variant, setVariant] = useState("web3");

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <>
      <Head>
        <title>Sebastian Arango — CV</title>
        <meta
          name="description"
          content="Sebastian Arango — Curriculum Vitae"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.pageBackground}>
        <div className={styles.controls}>
          <Link href="/" className={styles.controlBack}>
            ← Back to site
          </Link>

          <div
            className={styles.variantToggle}
            role="tablist"
            aria-label="CV variant"
          >
            {Object.entries(VARIANTS).map(([key, { label }]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={variant === key}
                onClick={() => setVariant(key)}
                className={`${styles.variantTab} ${
                  variant === key ? styles.variantTabActive : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className={styles.controlDownload}
          >
            Download as PDF
          </button>
        </div>

        <CVDocument data={VARIANTS[variant].data} />
      </div>
    </>
  );
}

CVPage.getLayout = (page) => page;
