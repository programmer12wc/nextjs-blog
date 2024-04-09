import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ poolData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {poolData?.amiiboSeries} - {poolData?.head}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={poolData?.amiiboSeries + "-" + poolData?.head}
        />
        <meta property="og:image" content={poolData.image} />
      </Head>

      <Link href="/">Back to Home</Link>
      <main>
        <h1>{poolData.character}</h1>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  let config = {
    method: "get",
    url: `https://amiiboapi.com/api/amiibo/?character=${id}`,
  };
  const response = await axios(config);
  const poolData = response?.data?.amiibo[0];

  // Return the data as props
  return {
    props: {
      poolData,
    },
  };
}
