import Head from 'next/head';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import config from 'config/stroller/config.json';
import withItemProvider, { withItemsConsumer } from 'contexts/ItemContext';
import { useItem } from 'utils/api';
import ProductSelect from 'components/compare/ProductSelect';
import ProductDetailsTable from 'components/compare/ProductDetailsTable';

export async function getStaticProps() {
  return {
    props: {
      config,
    },
  };
}

const Compare = ({ config, itemContext }) => {
  const defaultItems = [1, 2];
  const [itemIds, setItemIds] = useState(defaultItems);
  const [item1, isLoadingItem1] = useItem(itemIds[0]);
  const [item2, isLoadingItem2] = useItem(itemIds[1]);

  // On load
  useEffect(() => {
    const { setConfig } = itemContext;
    setConfig(config);
  }, []);

  // On item 1 data update
  useEffect(() => {
    if (!isLoadingItem1) {
      const { setItems } = itemContext;
      setItems(item1, 0);
    }
  }, [item1]);

  // On item 2 data update
  useEffect(() => {
    if (!isLoadingItem2) {
      const { setItems } = itemContext;
      setItems(item2, 1);
    }
  }, [item2]);

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
          <ProductSelect onItemSelect={onItemSelect} defaultItems={defaultItems} />
          <ProductDetailsTable />
        </div>
      </div>
    </div>
  );
};

Compare.propTypes = {
  itemContext: PropTypes.shape({
    setConfig: PropTypes.func.isRequired,
    setItems: PropTypes.func.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    specLabels: PropTypes.array,
    page: PropTypes.object,
  }).isRequired,
};

export default withItemProvider(withItemsConsumer(Compare));
