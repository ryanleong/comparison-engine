import PropTypes from 'prop-types';

const colStartClasses = ['col-start-4', 'col-start-8'];

const ProductSelect = (props) => {
  const { onItemSelect, defaultItems } = props;

  const onSelectUpdate = (event, col) => {
    const id = parseInt(event.target.value, 10);
    onItemSelect(id, col);
  };

  return colStartClasses.map((className, idx) => (
    <div className={`col-span-4 row-start-1 ${className}`} key={className}>
      <select
        className="form-select mb-4 block w-full border rounded"
        onChange={(event) => onSelectUpdate(event, idx)}
        defaultValue={defaultItems[idx]}>
        <option value="1">Uppababy Vista V2</option>
        <option value="2">Graco Modes Click Connect Travel System</option>
        <option value="3">Doona Infant Car Seat/Stroller</option>
        <option value="4">Summer Infant 3Dlite Convenience Stroller</option>
        <option value="5">Nuna Demi Grow</option>
        <option value="6">Bob Gear Revo Flex 3.0 Jogging Stroller</option>
        <option value="7">Baby Jogger City Mini Double Stroller</option>
        <option value="8">Chicco Bravo LE</option>
        <option value="9">Bugaboo Donkey 3 Mono Stroller</option>
        <option value="10">Babyzen Yoyo+ Stroller</option>
        <option value="11">Maclaren Mark II</option>
        <option value="12">Joie Pact Lite Stroller</option>
        <option value="13">BP Alex Lightweight Stroller</option>
        <option value="14">Baobaohao Good Baby</option>
      </select>
    </div>
  ));
};

ProductSelect.defaultProps = {
  onItemSelect: () => {},
};

ProductSelect.propTypes = {
  onItemSelect: PropTypes.func,
  defaultItems: PropTypes.array,
};

export default ProductSelect;
