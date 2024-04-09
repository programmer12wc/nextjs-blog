import Head from "next/head";
import Link from "next/link"; // Import Link component
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home({ poolData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amiibo Series - Head</title>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {poolData?.amiiboSeries} - {poolData?.head}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={poolData?.amiiboSeries + "-" + poolData?.head}
        />
        <meta property="og:image" content={poolData?.image} />
      </Head>

      <main>
        {/* Map through poolData array */}
        {poolData.map((data, index) => (
          <div key={index}>
            {/* Access properties of each data object */}
            <Link href={`/blog/${data.character}`}>{data.character}</Link>
          </div>
        ))}
      </main>
      <style jsx global>{`
        /* Your global styles */
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(context);
  try {
    const response = await axios.get(`https://amiiboapi.com/api/amiibo/`);
    const poolData = response?.data?.amiibo;

    return {
      props: {
        poolData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        poolData: [], // Return empty array in case of error
      },
    };
  }
}
