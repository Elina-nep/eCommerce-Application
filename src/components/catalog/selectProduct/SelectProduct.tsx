import PropTypes from 'prop-types';
import React, { ChangeEvent } from 'react';
interface Option {
  value: string;
  label: string;
}

export const options: Option[] = [
  { value: 'Default sorting', label: 'Default sorting' },
  { value: 'price asc', label: 'Sort by price: low to high' },
  { value: 'price desc', label: 'Sort by price: high to low' },
  { value: 'name.en asc', label: 'Sort by name: a to z' },
  { value: 'name.en desc', label: 'Sort by name: z to a' },
];
interface SelectProps {
  onSortChange: (sort: string, category?: string) => void;
  category?: string;
}
export const Select: React.FC<SelectProps> = ({ onSortChange, category }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    onSortChange(selectedValue, category);
  };

  return (
    <select
      className="product-select"
      defaultValue="Default sorting"
      onChange={handleChange}
      id="product-sorting"
      name="product-sorting"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
Select.defaultProps = {
  category: 'All Products',
};
Select.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  category: PropTypes.string,
};
