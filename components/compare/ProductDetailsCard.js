import PropTypes from 'prop-types';

const ProductDetailsCard = (props) => {
  const { col } = props;
  const classColStart = `col-start-${col * 4}`;

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

        <h2 className="text-2xl font-semibold mb-2">City Mini GT2 Stroller</h2>
        <p className="mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa saepe doloribus, pariatur
          provident rerum, tempore reprehenderit iusto quam corrupti, facilis porro.
        </p>
      </div>

      <div className={`col-span-4 py-6 border-b row-start-3 ${classColStart}`}>
        <span className="text-lg">41&quot; x 25.7&quot; x 42.8&quot;</span>
      </div>

      <div className={`col-span-4 py-6 border-b row-start-4 ${classColStart}`}>
        <span className="text-lg">41&quot; x 25.7&quot; x 42.8&quot;</span>
      </div>

      <div className={`col-span-4 py-6 border-b row-start-5 ${classColStart}`}>
        <span className="text-lg">41&quot; x 25.7&quot; x 42.8&quot;</span>
      </div>

      <div className={`col-span-4 py-6 border-b row-start-6 ${classColStart}`}>
        <span className="text-lg">41&quot; x 25.7&quot; x 42.8&quot;</span>
      </div>
    </>
  );
};

ProductDetailsCard.defaultProps = {
  col: 1,
};

ProductDetailsCard.propTypes = {
  col: PropTypes.number,
};

export default ProductDetailsCard;
