import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styles from "@/styles/Home.module.css";
import { MainMenu } from "@/components/menu/mainMenu";
import { MailOutlined } from "@ant-design/icons";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>XenoPhobiA</title>
        <meta
          name="description"
          content="XPA main website. Game players center."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_short.png" />
      </Head>
      <main className={styles.main}>
        {/* <BackTop /> */}
        <MainMenu />
        <Component {...pageProps} />
        <footer className={styles.footer}>
          <a
            href="mailto: xpagchannel@gmail.com"
            target="_blank"
            rel="team mail noreferrer"
          >
            <MailOutlined title="Team Mail" style={{ marginRight: "1vw" }} />
            xpagchannel@gmail.com
          </a>
        </footer>
      </main>
    </>
  );
}
