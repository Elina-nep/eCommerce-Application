import { useEffect, useState } from 'react';
import {
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
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
import { Colors, Material } from '../../types/products';

const defaultResponse = {
  limit: 0,
  offset: 0,
  count: 0,
  results: [],
};

export const CatalogPage = () => {
  const [products, setProducts] =
    useState<ProductProjectionPagedQueryResponse>(defaultResponse);
  const [categories, setCategories] =
    useState<CategoryPagedQueryResponse>(defaultResponse);
  const [loading, setLoading] = useState(false);
  const defaultCategoryName = 'All Products';
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>(defaultCategoryName);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const handleSortChange = (sort: string, category?: string) => {
    const categoryId = category !== undefined ? category : selectedCategoryId;
    const newSorting =
      sort === 'Default sorting' ? undefined : (sort as Sorting);
    setSorting(newSorting);
    setCurrentPage(1);
    handleGetProducts({
      sort: newSorting,
      categoryId,
      pageNum: 0,
      colors: selectedColors.length ? selectedColors : undefined,
      materials: selectedMaterials.length ? selectedMaterials : undefined,
    });
  };
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const handleMaterialChange = (selectedMaterial: Material) => {
    setSelectedMaterials((prevSelectedMaterials) => {
      const newSelectedMaterials = prevSelectedMaterials.includes(
        selectedMaterial,
      )
        ? prevSelectedMaterials.filter(
            (material) => material !== selectedMaterial,
          )
        : [...prevSelectedMaterials, selectedMaterial];
      const materialsQueryParam = newSelectedMaterials.length
        ? newSelectedMaterials
        : undefined;
      handleGetProducts({
        sort: sorting,
        categoryId: selectedCategoryId,
        pageNum: currentPage - 1,
        colors: selectedColors.length ? selectedColors : undefined,
        materials: materialsQueryParam,
      });
      return newSelectedMaterials;
    });
  };
  const handleResetMaterials = () => {
    setSelectedMaterials([]);
    handleGetProducts({
      sort: sorting,
      categoryId: selectedCategoryId,
      pageNum: currentPage - 1,
      colors: undefined,
      materials: undefined,
    });
  };
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const formMaterials = () => {
    const allMaterials = [
      'latex',
      'foil',
      'paper',
      'fabric',
      'wood',
      'plastic',
      'metal',
      'mixed',
    ];
    const visibleMaterials = showAllMaterials
      ? allMaterials
      : allMaterials.slice(0, 6);

    return (
      <>
        {visibleMaterials.map((material) => (
          <div key={material} className="colors-checkbox">
            <input
              type="checkbox"
              id={`material-${material}`}
              name="material"
              value={material}
              checked={selectedMaterials.includes(material as Material)}
              onChange={() => handleMaterialChange(material as Material)}
            />
            <label htmlFor={`material-${material}`}>{material}</label>
          </div>
        ))}
        <div>
          {showAllMaterials && (
            <div>
              <button
                className="colors-button-reset"
                onClick={handleResetMaterials}
              >
                Reset
              </button>
            </div>
          )}
          <button
            className="colors-button-show-all"
            onClick={() => setShowAllMaterials(!showAllMaterials)}
          >
            {showAllMaterials ? 'Hide' : 'Show all'}
          </button>
        </div>
      </>
    );
  };
  const [selectedColors, setSelectedColors] = useState<Colors[]>([]);
  const handleColorChange = (selectedColor: Colors) => {
    setSelectedColors((prevSelectedColors) => {
      const newSelectedColors = prevSelectedColors.includes(selectedColor)
        ? prevSelectedColors.filter((color) => color !== selectedColor)
        : [...prevSelectedColors, selectedColor];
      const colorsQueryParam = newSelectedColors.length
        ? newSelectedColors
        : undefined;
      handleGetProducts({
        sort: sorting,
        categoryId: selectedCategoryId,
        pageNum: currentPage - 1,
        colors: colorsQueryParam,
        materials: selectedMaterials.length ? selectedMaterials : undefined,
      });
      return newSelectedColors;
    });
  };
  const handleResetColors = () => {
    setSelectedColors([]);
    handleGetProducts({
      sort: sorting,
      categoryId: selectedCategoryId,
      pageNum: currentPage - 1,
      colors: undefined,
    });
  };
  const [showAllColors, setShowAllColors] = useState(false);
  const formColors = () => {
    const allColors = [
      'black',
      'grey',
      'beige',
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
    ];
    const visibleColors = showAllColors ? allColors : allColors.slice(0, 6);

    return (
      <>
        {visibleColors.map((color) => (
          <div key={color} className="colors-checkbox">
            <input
              type="checkbox"
              id={`color-${color}`}
              name="color"
              value={color}
              checked={selectedColors.includes(color as Colors)}
              onChange={() => handleColorChange(color as Colors)}
            />
            <label htmlFor={`color-${color}`}>{color}</label>
          </div>
        ))}
        <div>
          {showAllColors && (
            <div>
              <button
                className="colors-button-reset"
                onClick={handleResetColors}
              >
                Reset
              </button>
            </div>
          )}
          <button
            className="colors-button-show-all"
            onClick={() => setShowAllColors(!showAllColors)}
          >
            {showAllColors ? 'Hide' : 'Show all'}
          </button>
        </div>
      </>
    );
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<Sorting | undefined>(undefined);
  const handleGetProducts = (queryParams?: ProductQueryParams) => {
    if (queryParams && queryParams.categoryId) {
      setSelectedCategoryId(queryParams.categoryId);
    } else {
      setSelectedCategoryId('');
    }

    if (queryParams && queryParams.pageNum !== undefined) {
      setCurrentPage(queryParams.pageNum + 1);
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
    handleGetProducts();
    getCategoriesFunc()
      .then((body) => {
        setCategories(body);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const formProducts = () => {
    return products.results.map((el) => {
      const name = el.name['en'];
      const image = el.masterVariant.images?.[0]?.url ?? '';
      const { centAmount, currencyCode } = el.masterVariant.prices?.[0]
        ?.value || { centAmount: 0, currencyCode: '' };
      const priceValue = centAmount / 100;
      const productCardImageStyle = {
        backgroundImage: `url("${image}")`,
      };
      return (
        <div className="product-card" key={el.id}>
          <div
            className="product-card-image"
            style={productCardImageStyle}
          ></div>
          <p className="product-card-name">{name}</p>
          {priceValue && (
            <p className="product-card-price">
              {priceValue} {currencyCode}
            </p>
          )}
        </div>
      );
    });
  };

  const formCategories = () => {
    if (categoriesExpanded) {
      return [
        <li
          key="all-products"
          onClick={() => {
            setSelectedCategoryName(defaultCategoryName);
            handleSortChange('Default sorting', '');
          }}
        >
          {defaultCategoryName}
        </li>,
        ...categories.results.map((el) => {
          const name = el.name['en'];
          return (
            <li
              key={el.id}
              onClick={() => {
                if (selectedCategoryId !== el.id) {
                  setSelectedCategoryName(name);
                  handleSortChange('Default sorting', el.id);
                  setCategoriesExpanded(false);
                }
              }}
            >
              {name}
            </li>
          );
        }),
      ];
    } else {
      return [
        <li
          key="select-category"
          onClick={() => {
            if (selectedCategoryName !== defaultCategoryName) {
              return;
            }
            setCategoriesExpanded(true);
          }}
        >
          {selectedCategoryName}
          <button
            className="select-category-list"
            onClick={() => {
              setSelectedCategoryName(defaultCategoryName);
              handleSortChange('Default sorting', '');
              setCategoriesExpanded(true);
            }}
          >
            &#8592; All Categories
          </button>
        </li>,
      ];
    }
  };

  return (
    <main className="main-container-catalog">
      <div className="catalog-container">
        <div className="catalog-container-sorting">
          <div className="product-item-number">
            Showing all <span className="product-count">{products.total}</span>
            results
          </div>
          <Select
            key={selectedCategoryId}
            onSortChange={handleSortChange}
            category={selectedCategoryId}
          />
        </div>
        <div className="catalog-container-product">
          <aside className="catalog-container-sidebar">
            <div className="sidebar-filter-category">
              Filter by Category:
              <ul>{formCategories()}</ul>
            </div>
            <div className="sidebar-filter-price">Filter by Price:</div>
            <div className="sidebar-filter-color">
              Filter by Colors:
              <ul className="color-list">{formColors()}</ul>
            </div>
            <div className="sidebar-filter-material">
              {' '}
              Filter by Materials: {formMaterials()}{' '}
            </div>
            <div className="sidebar-filter-occasion">Filter by Occasion:</div>
          </aside>
          <div className="catalog-container-right-side">
            <section className="product-card-wrapper">
              {loading && <LoadingSpinner />}
              {!loading && !!products.count && formProducts()}
            </section>
            {products.total !== undefined && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(products.total / PRODUCTS_ON_PAGE)}
                onPageChange={(newPage) => {
                  handleGetProducts({
                    sort: sorting,
                    categoryId: selectedCategoryId,
                    pageNum: newPage - 1,
                    colors: selectedColors.length ? selectedColors : undefined,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
