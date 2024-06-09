import MainPage from "../pages/main/page";
import Head from "next/head";
import keywords from "@/lib/definition/seo";
export default function HomePage() {
  const keywordsContent = keywords.join(", ");

  return (
    <>
      <Head>
        <title>Cek MRT - Jadwal</title>
        <meta
          name="description"
          content="Cek MRT -> Cari jadwal MRT dari berbagai Stasiun"
        />
        <meta name="keywords" content={keywordsContent} />
      </Head>
      <MainPage />
    </>
  );
}
