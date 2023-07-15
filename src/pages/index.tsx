import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DataTable from "@/components/DataTable";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tryp Datatable</title>
        <meta name="description" content="Application created for tryp assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <DataTable />
      </main>
    </>
  );
}
