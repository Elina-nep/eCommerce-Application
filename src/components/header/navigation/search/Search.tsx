import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { ReactComponent as InputIcon } from '../../../../assets/inputIcon.svg';

export const Search = () => {
  const [searchLine, setSearchLine] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const changeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const searchLink = new URLSearchParams(searchParams);
    if (!searchLink.get('category')) {
      searchLink.set('category', 'all');
    }
    searchLink.set('search', input);
    setSearchLine(searchLink.toString());
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchLine) {
      navigate({
        pathname: '/catalog',
        search: searchLine,
      });
    }
  };

  return (
    <>
      <input
        className="navigation-text-field__input"
        type="search"
        name="find"
        id="find"
        placeholder="Search"
        onChange={changeSearchInput}
        onKeyDown={handleEnterKey}
      />
      <Link
        className="navigation-text-field__aicon"
        to={{ pathname: `/catalog`, search: searchLine }}
      >
        <InputIcon />
      </Link>
    </>
  );
};
