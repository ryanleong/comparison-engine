import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withAppContextConsumer } from 'contexts/AppContext';
import { useItem } from 'utils/api';
import Spinner from 'components/Spinner';

const IS_LOADING = 'IS_LOADING';

const ProductDetailsTable = ({ appContext, selectedItemIds, defaultItemData }) => {
  const { config } = appContext;
  if (!config) return null;

  const [tableData, setTableData] = useState([]);

  // https://github.com/vercel/swr/issues/284
  const [item1, isLoadingItem1] = useItem(selectedItemIds[0], {
    initialData: selectedItemIds[0] === config.defaultItemIds[0] ? defaultItemData[0] : undefined,
  });
  const [item2, isLoadingItem2] = useItem(selectedItemIds[1], {
    initialData: selectedItemIds[1] === config.defaultItemIds[1] ? defaultItemData[1] : undefined,
  });

  const setupTableData = () => {
    const rows = config.specLabels.reduce((tableRows, { id, label }) => {
      const item1Spec = item1?.specs[id];
      const item2Spec = item2?.specs[id];

      if (!item1Spec && !item2Spec) {
        return tableRows;
      }

      return [...tableRows, { id, label, item1Spec, item2Spec }];
    }, []);

    setTableData(rows);
  };

  useEffect(() => {
    if (config && item1 && item2) {
      setupTableData();
    }
  }, [config, item1, item2]);

  const constructMetaList = () => {
    const itemsList = [];
    if (isLoadingItem1) {
      itemsList.push(IS_LOADING);
    } else {
      itemsList.push(item1);
    }
    if (isLoadingItem2) {
      itemsList.push(IS_LOADING);
    } else {
      itemsList.push(item2);
    }

    return itemsList;
  };

  const renderSpinner = (fistEleClass, idx) => {
    return (
      <div
        className={`col-span-6 md:col-span-4 border-b row-start-2 ${fistEleClass} flex justify-center py-6`}
        key={`loading_${idx}_meta`}>
        <Spinner />
      </div>
    );
  };

  const renderItemMeta = () => {
    const itemsList = constructMetaList();

    const $el = itemsList.map((item, idx) => {
      const fistEleClass = idx == 0 ? 'md:col-start-4' : '';

      if (item === IS_LOADING) {
        return renderSpinner(fistEleClass, idx);
      }

      const { id, image, model, description } = item;
      const keyPrefix = `${id}_${idx}`;

      return (
        <div
          className={`col-span-6 md:col-span-4 border-b row-start-2 ${fistEleClass}`}
          key={`${keyPrefix}_meta`}>
          <figure className="mb-4 w-full h-48 md:h-72">
            <img className="object-contain h-full w-full" src={image} alt="Product" />
          </figure>

          <h2 className="text-2xl font-semibold mb-2">{model}</h2>
          <p className="mb-4">{description}</p>
        </div>
      );
    });

    return [
      $el,
      <div className="row-start-2 col-span-1 col-start-8 hidden lg:block" key={'meta-space'}></div>,
    ];
  };

  const renderOthersLists = (key, items = []) => {
    const itemsEl = items.map((item) => (
      <li className="list-disc text-lg" key={`${key}_${item}`}>
        {item}
      </li>
    ));
    return <ul className="list-inside">{itemsEl}</ul>;
  };

  const formatText = (text) => {
    return text !== '' ? text : '-';
  };

  const renderRows = () => {
    return tableData.reduce((finalRows, row, idx) => {
      const { id, label, item1Spec, item2Spec } = row;
      const fistEleClass = idx == 0 ? 'row-start-3' : '';
      const borderBottom = idx !== tableData.length - 1 ? 'border-b' : '';
      const detailClass = `col-span-6 md:col-span-4 py-6 ${borderBottom}`;
      const keyPrefix = `${id}_${idx}`;

      return [
        ...finalRows,
        <div
          className={`hidden md:block col-span-3 py-6 ${fistEleClass}`}
          key={`${keyPrefix}_label`}>
          <span className="text-lg font-bold">{label}</span>
        </div>,
        <div className={detailClass} key={`${keyPrefix}_item1`}>
          {id !== 'others'
            ? formatText(item1Spec)
            : renderOthersLists(`${keyPrefix}_item1_others`, item1Spec)}
        </div>,
        <div
          className="col-span-1 col-start-8 hidden lg:block"
          key={`${keyPrefix}_item-space`}></div>,
        <div className={detailClass} key={`${keyPrefix}_item2`}>
          {id !== 'others'
            ? formatText(item2Spec)
            : renderOthersLists(`${keyPrefix}_item2_others`, item2Spec)}
        </div>,
      ];
    }, []);
  };

  return (
    <>
      {renderItemMeta()}
      {renderRows()}
    </>
  );
};

ProductDetailsTable.propTypes = {
  appContext: PropTypes.shape({
    config: PropTypes.object,
  }).isRequired,
  selectedItemIds: PropTypes.array.isRequired,
  defaultItemData: PropTypes.array,
};

export default withAppContextConsumer(ProductDetailsTable);
