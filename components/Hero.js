import PropTypes from 'prop-types';

const Hero = ({ data }) => {
  const title = data?.title;
  const usp = data?.usp;
  const description = data?.description;

  return (
    <div className="font-headers container mx-auto px-4 pt-10 pb-2 md:pb-6">
      <div className="grid grid-flow-row grid-cols-12 gap-x-4 md:mb-6">
        <div className="col-span-12 md:col-span-10 lg:col-span-5">
          <h1 className="font-extrabold text-2xl text-accent mb-4 md:mb-6">{title} </h1>

          <h3 className="text-3xl md:text-4xl mb-2">
            {usp[0]}
            <br />
            <span className="text-6xl md:text-7xl font-extrabold">{usp[1]}</span>
          </h3>

          <h3 className="text-gray-500">{description}</h3>
        </div>
      </div>

      <div className="w-0.5 h-28 bg-accent hidden md:block"></div>
    </div>
  );
};

Hero.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    usp: PropTypes.array,
    description: PropTypes.string,
  }).isRequired,
};

export default Hero;
