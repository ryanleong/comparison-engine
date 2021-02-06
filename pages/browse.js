import Head from 'next/head';
import SidebarFilter from 'components/SidebarFilter';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Comparison Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4">Comparison</h1>
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-3 font-sans">
            <SidebarFilter />
          </div>
          <div className="col-span-9 font-serif">Content</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
