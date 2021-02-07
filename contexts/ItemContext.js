/* eslint-disable react/display-name */
import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Context
 */
export const ItemContext = createContext();
export const useItemContext = () => useContext(ItemContext);

/**
 * Context consumer HOC
 * @param {Object} ChildComponent React child component
 */
export const withItemsConsumer = (ChildComponent) => (props) => {
  const itemContext = useContext(ItemContext);
  return <ChildComponent {...props} itemContext={itemContext} />;
};

/**
 * Context provider HOC
 * @param {Object} ChildComponent React child component
 */
const withItemProvider = (ChildComponent) => (props) => {
  const [config, setConfigFn] = useState(null);
  const [items, setItemsFn] = useState([]);
  const [tableData, setTableData] = useState([]);

  /**
   * Callbacks
   */
  const setupTableData = (items) => {
    // Setup rows
    const rows = config.specLabels.reduce((tableRows, { id, label }) => {
      const item1Spec = items[0]?.specs[id];
      const item2Spec = items[1]?.specs[id];

      if (!item1Spec && !item2Spec) {
        return tableRows;
      }

      return [...tableRows, { id, label, item1Spec, item2Spec }];
    }, []);

    setTableData(rows);
  };

  const setItems = (item, index) => {
    setItemsFn((currentItems) => {
      const updatedItems = [...currentItems];
      updatedItems[index] = item;
      setupTableData(updatedItems);
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
      items,
      setItems,
      tableData,
    }),
    [config, setConfig, items, setItems, tableData]
  );

  return (
    <ItemContext.Provider value={contextValue}>
      <ChildComponent {...props} />
    </ItemContext.Provider>
  );
};

export default withItemProvider;
