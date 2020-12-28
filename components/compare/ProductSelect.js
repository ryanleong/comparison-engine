import PropTypes from 'prop-types';

const ProductSelect = (props) => {
  const { col } = props;
  const startCol = `col-start-${col * 4}`;

  return (
    <>
      <div className={`col-span-4 border-b row-start-1 ${startCol}`}>
        <select className="form-select mb-4 block w-full border rounded">
          <option value="City Mini GT2 Stroller">City Mini GT2 Stroller</option>
        </select>
      </div>
    </>
  );
};

ProductSelect.defaultProps = {
  col: 1,
};

ProductSelect.propTypes = {
  col: PropTypes.number,
};

export default ProductSelect;
