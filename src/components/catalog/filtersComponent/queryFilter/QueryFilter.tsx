import './QueryFilter.scss';

import React, { useEffect, useState } from 'react';

import { FilterComponentT, NUMBER_OF_VISIBLE_FILTERS } from '../../../../types';
import Button from '../../../buttons/Button';
import { FilterItem } from './filterItem/FilterItem';

export const QueryFilter = <T,>({
  searchParams,
  setSearchParams,
  allItems,
  queryType,
}: React.PropsWithChildren<FilterComponentT<T>>): React.ReactElement => {
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>(
    searchParams.getAll(queryType) as T[],
  );

  useEffect(() => {
    setSelectedItems(searchParams.getAll(queryType) as T[]);
  }, [queryType, searchParams]);

  const handleResetItems = () => {
    searchParams.delete(queryType);
    setSearchParams(searchParams);
    setSelectedItems([]);
  };

  const handleItemsChange = (selectedItem: T) => {
    const newSelectedItems = selectedItems.includes(selectedItem)
      ? selectedItems.filter((item) => item !== selectedItem)
      : [...selectedItems, selectedItem];
    searchParams.delete(queryType);
    newSelectedItems.forEach((el) => {
      searchParams.append(queryType, el as string);
    });
    setSearchParams(searchParams);
    setSelectedItems(newSelectedItems);
  };

  const formItems = () => {
    const visibleMaterials = showAllItems
      ? allItems
      : allItems.slice(0, NUMBER_OF_VISIBLE_FILTERS);

    return (
      <div className="material-list">
        {visibleMaterials.map((item) => (
          <FilterItem
            key={item as string}
            item={item}
            selectedItems={selectedItems}
            handleItemChange={handleItemsChange}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="sidebar-filter-material">
      Filter by {queryType}: {formItems()}
      <div>
        <Button
          className="colors-button-show-all"
          onClick={() => setShowAllItems(!showAllItems)}
        >
          {showAllItems ? 'Hide' : 'Show all'}
        </Button>
        <Button className="colors-button-reset" onClick={handleResetItems}>
          Reset
        </Button>
      </div>
    </div>
  );
};
