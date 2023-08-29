import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import Button from '../../components/buttons/Button';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import {
  getCategoriesFunc,
  getProductsFunc,
  PRODUCTS_ON_PAGE,
} from '../../util';
import { ProductQueryParams, Sorting } from '../../types';
import './Catalog.scss';
import { Select } from '../../components/productselect/productselect';
import Pagination from '../../components/pagination/Pagination';
import { Colors } from '../../types/products';

const defaultResponse = {
  limit: 0,
  offset: 0,
  count: 0,
  results: [],
};

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.getAll('sort'), searchParams.get('sort'));
  const params = useParams();
  const [products, setProducts] =
    useState<ProductProjectionPagedQueryResponse>(defaultResponse);
  const [categories, setCategories] =
    useState<CategoryPagedQueryResponse>(defaultResponse);
  const [loading, setLoading] = useState(false);
  const defaultCategoryName = 'All Products';
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    params.category || defaultCategoryName,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const handleSortChange = (sort: string, category?: string) => {
    const categoryId = category !== undefined ? category : selectedCategoryId;
    const newSorting =
      sort === 'Default sorting' ? undefined : (sort as Sorting);
    setSorting(newSorting);
    handleGetProducts({ sort: newSorting, categoryId });
  };
  const [selectedColors, setSelectedColors] = useState<Colors[]>([]);
  const handleColorChange = (selectedColor: Colors) => {
    if (selectedColors.includes(selectedColor)) {
      setSelectedColors(
        selectedColors.filter((color) => color !== selectedColor),
      );
    } else {
      setSelectedColors([...selectedColors, selectedColor]);
    }
    console.log(searchParams);
    setSearchParams({
      // ...searchParams,
      sort: searchParams.getAll('sort'),
      color: selectedColor,
    });
    handleGetProducts({
      sort: sorting,
      categoryId: selectedCategoryId,
      colors: selectedColors,
      pageNum: currentPage - 1,
    });
  };

  const formColors = () => {
    return [
      'black',
      'white',
      'blue',
      'brown',
      'green',
      'red',
      'purple',
      'pink',
      'orange',
      'yellow',
      'gold',
      'silver',
      'multicolored',
    ].map((color) => (
      <li
        key={color}
        className={`color-item${
          selectedColors.includes(color as Colors) ? ' selected' : ''
        }`}
        onClick={() => handleColorChange(color as Colors)}
      >
        {color}
      </li>
    ));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const handleGetProducts = (queryParams?: ProductQueryParams) => {
    if (queryParams && queryParams.categoryId) {
      setSelectedCategoryId(queryParams.categoryId);
    } else {
      setSelectedCategoryId('');
    }
    getProductsFunc(setLoading, queryParams)
      .then((body) => {
        console.log(body);
        setProducts(body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setSelectedCategoryName(params.category || '');
    getCategoriesFunc()
      .then((body) => {
        console.log(body);
        setCategories(body);
        const currentCategory = body.results.find(
          (element) => element.name['en'] === selectedCategoryName,
        )?.id;
        handleGetProducts({ categoryId: currentCategory || '' });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params, selectedCategoryName]);

  const formProducts = () => {
    return products.results.map((el) => {
      const name = el.name['en'];
      const category = categories.results.find(
        (category) => category.id === el.categories[0].id,
      );
      const categoryName = category ? category.name['en'] : '';
      const image = el.masterVariant.images?.[0]?.url ?? '';
      const { centAmount, currencyCode } = el.masterVariant.prices?.[0]
        ?.value || { centAmount: 0, currencyCode: '' };
      const priceValue = centAmount / 100;

      return (
        <div className="product-card" key={el.id}>
          <div className="product-card-image">
            {image && <img src={image} alt={name} />}
          </div>
          <p className="product-card-category">{categoryName}</p>
          <p className="product-card-name">{name}</p>
          {priceValue && (
            <p className="product-card-price">
              {priceValue} {currencyCode}
            </p>
          )}
          <Link
            to={{
              pathname: `/product/${el.id}`,
            }}
          >
            More information
          </Link>
        </div>
      );
    });
  };

  const formCategories = () => {
    return [
      <li key="all">
        <Link to={`/catalog/all`}>{defaultCategoryName}</Link>
      </li>,

      ...categories.results.map((el) => {
        const name = el.name['en'];
        if (!el.parent) {
          return (
            <li key={el.id}>
              <Link to={`/catalog/${name}`}>{name}</Link>
            </li>
          );
        }
        return;
      }),
    ];
  };

  return (
    <main className="main-container main-container-catalog">
      <div className="catalog-container">
        {products.total !== undefined && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(products.total / PRODUCTS_ON_PAGE)}
            onPageChange={(newPage) => {
              setCurrentPage(newPage);
              handleGetProducts({
                sort: sorting,
                categoryId: selectedCategoryId,
                pageNum: newPage - 1,
              });
            }}
          />
        )}
        <div className="catalog-container-sorting">
          <div>
            {selectedCategoryName ? `Showing ${selectedCategoryName}` : ''}
            {/*DELETE*/}
          </div>
          <div className="product-item-number">
            Showing all {products.total} results
          </div>
          <Select
            onSortChange={handleSortChange}
            category={selectedCategoryId}
          />
        </div>
        <div className="catalog-container-product">
          <aside className="catalog-container-sidebar">
            <div className="sidebar-filter-category">
              Filter by Category:
              <p>Categories</p>
              <ul>{formCategories()}</ul>
              <Button onClick={handleGetProducts}>get products</Button>
            </div>
            <div className="sidebar-filter-price">Filter by Price:</div>
            <div className="sidebar-filter-color">
              Filter by Colors:
              <ul className="color-list">{formColors()}</ul>
            </div>
            <div className="sidebar-filter-material">Filter by Materials:</div>
            <div className="sidebar-filter-occasion">Filter by Occasion:</div>
          </aside>
          <section className="product-card-wrapper">
            {loading && <LoadingSpinner />}
            {!loading && !!products.count && formProducts()}
          </section>
        </div>
      </div>
    </main>
  );
};
