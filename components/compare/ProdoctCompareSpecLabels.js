import PropTypes from 'prop-types';
import { withItemsConsumer } from 'contexts/AppContext';

const ProdoctCompareSpecLabels = (props) => {
  const { appContext } = props;

  const renderLabels = () => {
    return appContext.labels.map(({ id, label }, index) => {
      const classes = `col-span-3 row-start-${index + 3} col-start-1 py-6`;
      return (
        <div className={classes} key={id}>
          <span className="text-lg font-bold">{label}</span>
        </div>
      );
    });
  };

  return <>{renderLabels()}</>;
};

ProdoctCompareSpecLabels.propTypes = {
  appContext: PropTypes.shape({
    labels: PropTypes.array.isRequired,
  }).isRequired,
};

export default withItemsConsumer(ProdoctCompareSpecLabels);
