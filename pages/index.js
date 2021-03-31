import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getConfig, getItems } from 'utils/firebase';
import withAppContextProvider, { withAppContextConsumer } from 'contexts/AppContext';

const Hero = dynamic(() => import('components/Hero'));
const ProductSelect = dynamic(() => import('components/compare/ProductSelect'));
const ProductDetailsTable = dynamic(() => import('components/compare/ProductDetailsTable'));
const Footer = dynamic(() => import('components/Footer'));

export async function getStaticProps() {
  const config = await getConfig();
  const { defaultItemIds } = config;

  const items = await getItems();
  const defaultItemData = items.filter(({ id }) => defaultItemIds.includes(id));
  const itemsList = items.map(({ id, model }) => ({ id, model }));

  return {
    props: { config, itemsList, defaultItemData },
  };
}

const Compare = ({ config, itemsList, defaultItemData, appContext }) => {
  const { defaultItemIds } = config;
  const [itemIds, setItemIds] = useState(defaultItemIds);

  // On load
  useEffect(() => {
    appContext.setConfig(config);
  }, []);

  const onItemSelect = (itemId, idx) => {
    setItemIds((currentItemIds) => {
      const updatedItemIds = [...currentItemIds];
      updatedItemIds[idx] = itemId;
      return updatedItemIds;
    });
  };

  return (
    <div className="comapre-page">
      <Head>
        <title>{config?.page?.home?.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={config?.page?.home?.seo?.metaDescription} />
        <meta property="og:title" content={config?.page?.home?.seo?.ogTitle} />
        <meta property="og:description" content={config?.page?.home?.seo?.ogDescription} />
        <meta property="og:image" content={config?.page?.home?.seo?.ogImage} />
      </Head>

      <Hero data={config?.page?.home} />

      <div className="container mx-auto px-4 py-6 overflow-x-auto">
        <h2 className="font-semibold uppercase tracking-widest text-accent mb-6">Compare</h2>

        <div className="content">
          <div className="grid grid-flow-row grid-cols-12 gap-x-4">
            <ProductSelect
              itemsList={itemsList}
              onItemSelect={onItemSelect}
              defaultItems={defaultItemIds}
            />
            <ProductDetailsTable selectedItemIds={itemIds} defaultItemData={defaultItemData} />
          </div>
        </div>
      </div>

      <Footer data={config?.about} />

      <style jsx>{`
        .content {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

Compare.propTypes = {
  appContext: PropTypes.shape({
    setConfig: PropTypes.func.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    specLabels: PropTypes.array,
    page: PropTypes.object,
    about: PropTypes.object,
    defaultItemIds: PropTypes.array,
  }).isRequired,
  itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultItemData: PropTypes.array,
};

export default withAppContextProvider(withAppContextConsumer(Compare));
