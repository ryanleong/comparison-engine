import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withItemsConsumer } from 'contexts/AppContext';
import { useItem } from 'utils/api';

const ProductDetailsCard = (props) => {
  const { col, id, appContext } = props;
  const classColStart = `col-start-${col * 4}`;
  const [item, isLoading, isError] = useItem(id);

  useEffect(() => {
    // Update context with item data
    if (!isLoading && !isError) {
      const { setItems } = appContext;
      setItems(item, col - 1);
    }
  }, [item]);

  const renderSpecs = () => {
    return appContext.labels.map(({ id }, index) => {
      const key = `${id}__${item.model}__${col}`;
      const rowClass = `row-start-${index + 3}`;

      return (
        <div className={`col-span-4 py-6 border-b ${rowClass} ${classColStart}`} key={key}>
          <span className="text-lg">{item.specs[id]}</span>
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className={`col-span-4 border-b row-start-2 ${classColStart}`}>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`col-span-4 border-b row-start-2 ${classColStart}`}>
        <p>Unable to load item.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`col-span-4 border-b row-start-2 ${classColStart}`}>
        <figure className="mb-4 w-full h-72">
          <img
            className="object-cover h-full w-full"
            src="https://picsum.photos/500/400"
            alt="Product"
          />
        </figure>

        <h2 className="text-2xl font-semibold mb-2">{item?.model}</h2>
        <p className="mb-4">{item?.description}</p>
      </div>

      {renderSpecs()}
    </>
  );
};

ProductDetailsCard.defaultProps = {
  col: 1,
};

ProductDetailsCard.propTypes = {
  appContext: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
  }).isRequired,
  col: PropTypes.number,
  id: PropTypes.number.isRequired,
};

export default withItemsConsumer(ProductDetailsCard);
