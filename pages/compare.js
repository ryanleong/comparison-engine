import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import config from 'config/stroller/config.json';
import withItemProvider, { withItemsConsumer } from 'contexts/AppContext';
import ProductSelect from 'components/compare/ProductSelect';
import ProductDetailsCard from 'components/compare/ProductDetailsCard';
import ProdoctCompareSpecLabels from 'components/compare/ProdoctCompareSpecLabels';

export async function getStaticProps() {
  return {
    props: {
      config,
    },
  };
}

const Compare = ({ config, appContext }) => {
  const defaultItems = [1, 2];
  const [itemIds, setItemIds] = useState(defaultItems);
  // const [labelsUsed, setLabelsUsed] = useState([]);

  useEffect(() => {
    const { setConfig } = appContext;
    setConfig(config);
  }, []);

  const onItemSelect = (id, col) => {
    setItemIds((currentItemIds) => {
      const updatedItemIds = [...currentItemIds];
      updatedItemIds[col - 1] = id;
      return updatedItemIds;
    });
  };

  return (
    <div className="comapre-page">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-11 gap-x-4">
          <ProdoctCompareSpecLabels />

          <ProductSelect col={1} onItemSelect={onItemSelect} defaultSelectedId={defaultItems[0]} />
          <ProductDetailsCard col={1} id={itemIds[0]} />

          <ProductSelect col={2} onItemSelect={onItemSelect} defaultSelectedId={defaultItems[1]} />
          <ProductDetailsCard col={2} id={itemIds[1]} />
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
  }).isRequired,
};

export default withItemProvider(withItemsConsumer(Compare));
