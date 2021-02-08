/* eslint-disable react/prop-types */
import 'styles/globals.scss';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <div id="webapp" className="bg-white text-gray-800">
      <div className="h-2.5 w-full bg-accent"></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
