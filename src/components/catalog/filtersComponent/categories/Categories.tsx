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

  const formCategories = () => {
    if (currentCategory === 'all') {
      return categories.results.map((el) => {
        if (!el.parent) {
          return (
            <CategoryItem
              key={el.id}
              category={el}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              isChild={false}
              hasChildren={false}
            />
          );
        }
      });
    } else {
      return [
        <div
          key="all-products"
          onClick={() => {
            searchParams.set('page', `1`);
            searchParams.set('category', `all`);
            setSearchParams(searchParams);
          }}
          className="categories-list-item"
        >
          {defaultCategoryName}
        </div>,
        categories.results.map((category) => {
          if (category.name['en'] === currentCategory && !category.parent) {
            const parentId = category.id;
            return [
              <CategoryItem
                key={parentId}
                category={category}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isChild={true}
                hasChildren={true}
              />,
              categories.results.map((child) => {
                if (child.parent && child.parent.id === parentId) {
                  return (
                    <CategoryItem
                      key={child.id}
                      category={child}
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                      isChild={true}
                      hasChildren={false}
                    />
                  );
                }
              }),
            ];
          }
          if (category.name['en'] === currentCategory && category.parent) {
            return [
              categories.results.map((child) => {
                if (category.parent && category.parent.id === child.id) {
                  return (
                    <CategoryItem
                      key={child.id}
                      category={child}
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                      isChild={true}
                      hasChildren={true}
                    />
                  );
                }
              }),
              <CategoryItem
                key={category.id}
                category={category}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isChild={true}
                hasChildren={false}
              />,
            ];
          }
        }),
      ];
    }
  };

  return (
    <div className="sidebar-filter-category">
      <p className="sidebar-filter-category-title">Filter by Category:</p>
      {formCategories()}
    </div>
  );
};
