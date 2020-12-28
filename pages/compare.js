import ProductSelect from 'components/compare/ProductSelect';
import ProductDetailsCard from 'components/compare/ProductDetailsCard';
import ProdoctCompareSpecLabels from 'components/compare/ProdoctCompareSpecLabels';

const Compare = () => {
  return (
    <div className="comapre-page">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-11 gap-x-4">
          <ProdoctCompareSpecLabels />

          <ProductSelect col={1} />
          <ProductDetailsCard col={1} />

          <ProductSelect col={2} />
          <ProductDetailsCard col={2} />
        </div>
      </div>
    </div>
  );
};

export default Compare;
