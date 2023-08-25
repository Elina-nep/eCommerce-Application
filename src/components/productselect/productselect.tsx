import { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

export const options: Option[] = [
  { value: 'Default sorting', label: 'Default sorting' },
  { value: 'Sort by name from a to z', label: 'Sort by name from a to z' },
  { value: 'Sort by name from z to a', label: 'Sort by name from z to a' },
  { value: 'Sort by price: low to high', label: 'Sort by price: low to high' },
  { value: 'Sort by: high to low', label: 'Sort by: high to low' },
];
export const Select: React.FC = () => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
  };

  return (
    <select
      className="product-select"
      defaultValue="Default sorting"
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
