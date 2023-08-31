import './FilterItem.scss';

type FilterItemT<T> = {
  item: T;
  selectedItems: T[];
  handleItemChange: (item: T) => void;
};

export const FilterItem = <T,>({
  item,
  selectedItems,
  handleItemChange,
}: React.PropsWithChildren<FilterItemT<T>>): React.ReactElement => {
  return (
    <div
      className={
        selectedItems.includes(item)
          ? 'filter-checkbox filter-item active'
          : 'filter-checkbox filter-item'
      }
      onClick={() => {
        handleItemChange(item);
      }}
    >
      {`${item}`}
    </div>
  );
};
