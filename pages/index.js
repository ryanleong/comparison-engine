import Head from 'next/head';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import config from 'config/stroller/config.json';
import defaultItems from 'config/stroller/defaultItems.json';
import withAppContextProvider, { withAppContextConsumer } from 'contexts/AppContext';
import ProductSelect from 'components/compare/ProductSelect';
import ProductDetailsTable from 'components/compare/ProductDetailsTable';

export async function getStaticProps() {
  return {
    props: {
      config,
      defaultItemData: defaultItems?.items,
    },
  };
}

const Compare = ({ config, defaultItemData, appContext }) => {
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
      </Head>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-flow-row grid-cols-11 gap-x-4">
          <ProductSelect onItemSelect={onItemSelect} defaultItems={defaultItemIds} />
          <ProductDetailsTable selectedItemIds={itemIds} defaultItemData={defaultItemData} />
        </div>
      </div>
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
    defaultItemIds: PropTypes.array,
  }).isRequired,
  defaultItemData: PropTypes.array,
};

export default withAppContextProvider(withAppContextConsumer(Compare));
