import Head from "next/head";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home({ poolData }) {
  const router = useRouter();
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
        <link rel="canonical" href={`http://localhost:3001${router.asPath}`} />
      </Head>

      <Link href="/blog">Back to Blog</Link>
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
  const { head } = context.query;
  let config = {
    method: "get",
    url: `https://amiiboapi.com/api/amiibo/?character=${head}`,
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
