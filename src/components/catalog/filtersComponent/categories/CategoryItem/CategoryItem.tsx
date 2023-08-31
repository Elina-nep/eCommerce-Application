import { CategoryT } from '../../../../../types';

export const CategoryItem = ({
  category,
  searchParams,
  setSearchParams,
  isChild,
  hasChildren,
}: CategoryT) => {
  return (
    <div
      key={category.id}
      onClick={() => {
        searchParams.set('page', `1`);
        searchParams.set('category', `${category.name['en']}`);
        setSearchParams(searchParams);
      }}
      className={`categories-list-item ${isChild && 'categories-child-item'}  ${
        hasChildren && 'categories-parent-item'
      }`}
    >
      {category.name['en']}
    </div>
  );
};
