import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ poolData }) {
  console.log(poolData);
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
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={poolData?.amiiboSeries + "-" + poolData?.head}
        />
        <meta property="og:description" content={poolData.amiiboSeries} />
        <meta property="og:url" content={``} />
        <meta property="og:site_name" content="dummy" />
        <meta property="og:image" content={poolData.image} />
        <meta property="og:image:secure_url" content={poolData.image} />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="530" />
        <meta property="og:image:alt" content={poolData.amiiboSeries} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content={poolData.amiiboSeries} />
        <meta
          name="twitter:title"
          content={poolData?.amiiboSeries + "-" + poolData?.head}
        />
        <meta name="twitter:description" content={poolData.amiiboSeries} />
        <meta name="twitter:image" content={poolData.image} />
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
