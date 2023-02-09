import React, { Children } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "@/styles/layout/MainLayout.module.sass";
import Head from "next/head";
import "../../public/fonts/Montserrat.module.css";

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Sebastian Web3</title>
        <meta
          name="description"
          content="My track as fullstack and blockchain lover."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
