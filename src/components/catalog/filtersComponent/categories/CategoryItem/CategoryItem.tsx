import { CategoryT } from '../../../../../types';

export const CategoryItem = ({
  category,
  searchParams,
  setSearchParams,
  isChild,
  children,
  isActive,
  isVisible,
}: CategoryT) => {
  return (
    <div
      key={category.id}
      onClick={() => {
        searchParams.set('page', `1`);
        searchParams.set('category', `${category.name['en']}`);
        setSearchParams(searchParams);
      }}
      className={`categories-list-item filter-item ${
        isChild ? 'categories-child-item' : 'categories-parent-item'
      } ${isActive ? 'active' : ''} ${isVisible ? '' : 'hidden'}
      }`}
    >
      {category.name['en']} {isChild ? '' : '>'}
      {children}
    </div>
  );
};
