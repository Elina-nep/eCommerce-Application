import './Categories.scss';

import { FiltersT } from '../../../../types';
import { CategoryItem } from './CategoryItem/CategoryItem';

export const Categories = ({
  categories,
  searchParams,
  setSearchParams,
}: FiltersT) => {
  const defaultCategoryName = 'All Products';
  const formCategories = () => {
    // if (categoriesExpanded) {
    return [
      //   <Link
      //     key="all-products"
      //     className="categories-list-item"
      //     to={{
      //       pathname: '/catalog/all',
      //       //   search: searchParams.toString(),
      //     }}
      //     onClick={() => {
      //       setSearchParams({ ...searchParams, page: '1' });
      //     }}
      //   >
      //     {defaultCategoryName}
      //   </Link>,
      <div
        key="all-products"
        onClick={() => {
          searchParams.set('page', `1`);
          searchParams.set('category', `all`);
          setSearchParams(searchParams);
        }}
        // to={{
        //   pathname: `/catalog/${category.name['en']}`,
        //   search: '',
        // }}
        className="categories-list-item"
      >
        {defaultCategoryName}
      </div>,
      ...categories.results.map((el) => {
        if (!el.parent) {
          return (
            <CategoryItem
              key={el.id}
              category={el}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          );
        }
      }),
    ];
    // } else {
    //   return [
    //     <li
    //       key="select-category"
    //       onClick={() => {
    //         if (selectedCategory.name !== defaultCategoryName) {
    //           return;
    //         }
    //         setCategoriesExpanded(true);
    //       }}
    //     >
    //       {selectedCategory.name}
    //       <button
    //         className="select-category-list"
    //         onClick={() => {
    //           handleSortChange('Default sorting', '');
    //           setCategoriesExpanded(true);
    //         }}
    //       >
    //         &#8592; All Categories
    //       </button>
    //     </li>,
    //   ];
    // }
  };

  return (
    <div className="sidebar-filter-category">
      <p>Filter by Category:</p>
      {formCategories()}
    </div>
  );
};
