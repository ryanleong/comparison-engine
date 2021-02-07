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

  const onItemSelect = (id, col) => {
    setItemIds((currentItemIds) => {
      const updatedItemIds = [...currentItemIds];
      updatedItemIds[col - 1] = id;
      return updatedItemIds;
    });
  };

  return (
    <div className="comapre-page">
      <Head>
        <title>Stroller Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-flow-row grid-cols-11 gap-x-4">
          <ProductSelect col={1} onItemSelect={onItemSelect} defaultSelectedId={defaultItems[0]} />
          <ProductSelect col={2} onItemSelect={onItemSelect} defaultSelectedId={defaultItems[1]} />
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
  }).isRequired,
};

export default withItemProvider(withItemsConsumer(Compare));
