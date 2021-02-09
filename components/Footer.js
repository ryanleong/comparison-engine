import PropTypes from 'prop-types';

const Footer = ({ data }) => {
  const { description, copyright } = data;

  return (
    <footer className="py-6 border-t-2">
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="grid grid-flow-row grid-cols-12 gap-x-4">
          <div className="col-span-12 md:col-span-10 lg:col-span-6">
            <h2 className="font-semibold uppercase tracking-widest text-accent mb-2">About</h2>
            <p className="text-gray-500 mb-6">{description}</p>
            <p className="text-gray-500 text-sm">&copy; 2021 {copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    copyright: PropTypes.string.isRequired,
  }).isRequired,
};

export default Footer;
