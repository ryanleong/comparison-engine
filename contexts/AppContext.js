/* eslint-disable react/display-name */
import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Context
 */
export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

/**
 * Context consumer HOC
 * @param {Object} ChildComponent React child component
 */
export const withAppContextConsumer = (ChildComponent) => (props) => {
  const appContext = useContext(AppContext);
  return <ChildComponent {...props} appContext={appContext} />;
};

/**
 * Context provider HOC
 * @param {Object} ChildComponent React child component
 */
const withAppContextProvider = (ChildComponent) => (props) => {
  const [config, setConfigFn] = useState(null);

  /**
   * Callbacks
   */
  const setConfig = (config) => {
    setConfigFn(config);
  };

  /**
   * Render
   */
  const contextValue = useMemo(
    () => ({
      config,
      setConfig,
    }),
    [config, setConfig]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ChildComponent {...props} />
    </AppContext.Provider>
  );
};

export default withAppContextProvider;
