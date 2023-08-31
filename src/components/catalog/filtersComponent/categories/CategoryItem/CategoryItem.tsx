import { Category } from '@commercetools/platform-sdk';
import { SetURLSearchParams } from 'react-router-dom';

type CategoryT = {
  category: Category;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const CategoryItem = ({
  category,
  searchParams,
  setSearchParams,
}: CategoryT) => {
  return (
    <div
      key={category.id}
      onClick={() => {
        searchParams.set('page', `1`);
        searchParams.set('category', `${category.name['en']}`);
        setSearchParams(searchParams);
      }}
      className="categories-list-item"
    >
      {category.name['en']}
    </div>
  );
};
