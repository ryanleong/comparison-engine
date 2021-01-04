import PropTypes from 'prop-types';

const ProductSelect = (props) => {
  const { col, onItemSelect } = props;
  const startCol = `col-start-${col * 4}`;

  const onSelectUpdate = (event) => {
    const id = parseInt(event.target.value, 10);
    onItemSelect(id, col);
  };

  return (
    <>
      <div className={`col-span-4 border-b row-start-1 ${startCol}`}>
        <select className="form-select mb-4 block w-full border rounded" onChange={onSelectUpdate}>
          <option value="1">City Mini GT2 Stroller</option>
          <option value="2">Vista V2 Stroller - Jordan</option>
        </select>
      </div>
    </>
  );
};

ProductSelect.defaultProps = {
  col: 1,
  onItemSelect: () => {},
};

ProductSelect.propTypes = {
  col: PropTypes.number,
  onItemSelect: PropTypes.func,
};

export default ProductSelect;
