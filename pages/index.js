import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Comparison Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4">Comparison</h1>
        <div className="grid grid-cols-12 gap-x-4">
          <p className="col-span-3 font-sans">Sidebar</p>
          <p className="col-span-9 font-serif">Content</p>
        </div>
      </div>
    </div>
  );
}
