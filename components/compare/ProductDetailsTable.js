import PropTypes from 'prop-types';
import { withItemsConsumer } from 'contexts/ItemContext';

const ProductDetailsTable = ({ itemContext }) => {
  const { tableData, items } = itemContext;

  const renderItemMeta = () => {
    return items.map((item, idx) => {
      const { id, image, model, description } = item;
      const fistEleClass = idx == 0 ? 'col-start-4' : '';
      const keyPrefix = `${id}_${idx}`;

      return (
        <div
          className={`col-span-4 border-b row-start-2 ${fistEleClass}`}
          key={`${keyPrefix}_meta`}>
          <figure className="mb-4 w-full h-72">
            <img className="object-contain h-full w-full" src={image} alt="Product" />
          </figure>

          <h2 className="text-2xl font-semibold mb-2">{model}</h2>
          <p className="mb-4">{description}</p>
        </div>
      );
    });
  };

  const renderOthersLists = (key, items = []) => {
    const itemsEl = items.map((item) => (
      <li className="list-disc text-lg" key={`${key}_${item}`}>
        {item}
      </li>
    ));
    return <ul className="list-inside">{itemsEl}</ul>;
  };

  const renderRows = () => {
    return tableData.reduce((finalRows, row, idx) => {
      const { id, label, item1Spec, item2Spec } = row;
      const fistEleClass = idx == 0 ? 'row-start-3' : '';
      const detailClass = 'col-span-4 py-6 border-b';
      const keyPrefix = `${id}_${idx}`;

      return [
        ...finalRows,
        <div className={`col-span-3 py-6 ${fistEleClass}`} key={`${keyPrefix}_label`}>
          <span className="text-lg font-bold">{label}</span>
        </div>,
        <div className={detailClass} key={`${keyPrefix}_item1`}>
          {id !== 'others' ? item1Spec : renderOthersLists(`${keyPrefix}_others`, item1Spec)}
        </div>,
        <div className={detailClass} key={`${keyPrefix}_item2`}>
          {id !== 'others' ? item2Spec : renderOthersLists(`${keyPrefix}_others`, item2Spec)}
        </div>,
      ];
    }, []);
  };

  return (
    <>
      {renderItemMeta()}
      {renderRows()}
    </>
  );
};

ProductDetailsTable.propTypes = {
  itemContext: PropTypes.shape({
    tableData: PropTypes.array,
    items: PropTypes.array,
  }).isRequired,
};

export default withItemsConsumer(ProductDetailsTable);
