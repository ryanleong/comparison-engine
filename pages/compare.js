import { useState } from 'react';

import ProductSelect from 'components/compare/ProductSelect';
import ProductDetailsCard from 'components/compare/ProductDetailsCard';
import ProdoctCompareSpecLabels from 'components/compare/ProdoctCompareSpecLabels';

const Compare = () => {
  const [itemIds, setItemIds] = useState([1, 1]);

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

          <ProductSelect col={1} onItemSelect={onItemSelect} />
          <ProductDetailsCard col={1} id={itemIds[0]} />

          <ProductSelect col={2} onItemSelect={onItemSelect} />
          <ProductDetailsCard col={2} id={itemIds[1]} />
        </div>
      </div>
    </div>
  );
};

export default Compare;
