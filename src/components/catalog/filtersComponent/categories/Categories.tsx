import './Categories.scss';

import { useEffect, useState } from 'react';

import { FiltersT } from '../../../../types';
import { CategoryItem } from './CategoryItem/CategoryItem';

export const Categories = ({
  categories,
  searchParams,
  setSearchParams,
}: FiltersT) => {
  const defaultCategoryName = 'All Products';
  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get('category'),
  );
  useEffect(() => {
    setCurrentCategory(searchParams.get('category'));
  }, [searchParams]);

  const allCategories = () => {
    const parentsList = categories.results.filter(
      (category) => !category.parent,
    );
    const childrenList = categories.results.filter(
      (category) => category.parent,
    );

    return [
      <div
        key="all-products"
        onClick={() => {
          searchParams.set('page', `1`);
          searchParams.set('category', `all`);
          setSearchParams(searchParams);
        }}
        className={`categories-list-item filter-item 
        ${currentCategory === 'all' && 'active'}
      }`}
      >
        {defaultCategoryName}
      </div>,
      parentsList.map((parent) => {
        return (
          <>
            <CategoryItem
              key={parent.id}
              category={parent}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              isChild={false}
              isActive={currentCategory === parent.name['en']}
              isVisible={true}
            />
            {childrenList
              .filter((child) => child.parent?.id === parent.id)
              .map((child) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  isChild={true}
                  isActive={currentCategory === child.name['en']}
                  isVisible={
                    (currentCategory === parent.name['en'] ||
                      currentCategory === child.name['en']) &&
                    currentCategory !== 'all'
                  }
                />
              ))}
          </>
        );
      }),
    ];
  };

  return (
    <div className="sidebar-filter-category">
      <p className="sidebar-filter-category-title">Filter by Category:</p>
      {allCategories()}
    </div>
  );
};
