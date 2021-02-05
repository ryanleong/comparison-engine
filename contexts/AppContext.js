/* eslint-disable react/display-name */
import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Context
 */
export const AppContext = createContext();
export const useAppContexts = () => useContext(AppContext);

/**
 * Context consumer HOC
 * @param {Object} ChildComponent React child component
 */
export const withItemsConsumer = (ChildComponent) => (props) => {
  const appContext = useContext(AppContext);
  return <ChildComponent {...props} appContext={appContext} />;
};

/**
 * Context provider HOC
 * @param {Object} ChildComponent React child component
 */
const withItemProvider = (ChildComponent) => (props) => {
  const [config, setConfigFn] = useState(null);
  const [items, setItemsFn] = useState([]);
  const [labels, setLabelsFn] = useState([]);

  /**
   * Callbacks
   */
  const setLabels = (configObj, itemSpecs, latestItems) => {
    const latestItemsSpecsKeys = latestItems.map(({ specs }) => {
      const specsEntries = Object.entries(specs);
      return specsEntries.reduce((specsWithContent, [key, spec]) => {
        if (spec && spec !== '') {
          return [...specsWithContent, key];
        }
        return specsWithContent;
      }, []);
    });

    const allLabelKeys = latestItemsSpecsKeys.reduce(
      (usedLabelKeys, specKeys) => [...usedLabelKeys, ...specKeys],
      []
    );

    // eslint-disable-next-line no-undef
    const labelKeys = [...new Set([...allLabelKeys])];

    // Filter out labels that are not in use
    const labelsToUse = config.specLabels.reduce((usedLabels, label) => {
      if (labelKeys.includes(label.id)) {
        return [...usedLabels, label];
      }
      return usedLabels;
    }, []);

    setLabelsFn(labelsToUse);
  };

  const setItems = (item, index) => {
    setItemsFn((currentItems) => {
      const updatedItems = [...currentItems];
      updatedItems[index] = item;

      // Update labels
      setLabels(config, item.specs, updatedItems);

      return updatedItems;
    });
  };

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
      labels,
      items,
      setItems,
    }),
    [config, setConfig, items, setItems, labels]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ChildComponent {...props} />
    </AppContext.Provider>
  );
};

export default withItemProvider;
