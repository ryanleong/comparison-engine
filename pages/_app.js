/* eslint-disable react/prop-types */
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';
import 'styles/globals.scss';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    });
  }, []);

  return (
    <div id="webapp" className="bg-white text-gray-800">
      <div className="h-2.5 w-full bg-accent"></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
