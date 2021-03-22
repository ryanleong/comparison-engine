import PropTypes from 'prop-types';

const colStartClasses = ['md:col-start-4', 'md:col-start-9'];

const ProductSelect = (props) => {
  const { onItemSelect, itemsList, defaultItems } = props;

  const onSelectUpdate = (event, col) => {
    const id = parseInt(event.target.value, 10);
    onItemSelect(id, col);
  };

  const $selects = colStartClasses.map((className, idx) => (
    <div className={`col-span-6 md:col-span-4 row-start-1 ${className}`} key={className}>
      <select
        className="form-select mb-4 block w-full border rounded"
        onChange={(event) => onSelectUpdate(event, idx)}
        defaultValue={defaultItems[idx]}>
        {itemsList.map(({ id, model }) => (
          <option value={id} key={id}>
            {model}
          </option>
        ))}
      </select>
    </div>
  ));

  return [
    $selects,
    <div
      className="row-start-1 col-span-1 col-start-8 hidden lg:block"
      key={'select_spacer'}></div>,
  ];
};

ProductSelect.defaultProps = {
  onItemSelect: () => {},
};

ProductSelect.propTypes = {
  onItemSelect: PropTypes.func,
  defaultItems: PropTypes.array,
};

export default ProductSelect;
