import React from 'react';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';

// components...
import DropBox from './dropbox';
import SearchOption from './SearchBar/SearchOption';
import SearchOptionList from './SearchBar/SearchOptionList';

// lib...
import useToggle from '../../lib/hooks/toggleHook';
import { brandingColor } from '../../lib/styles/branding';

const SearchBarWrap = styled.div`
  width: 80%;
  display: flex;
  align-items: center;

  & > fieldset {
    width: 100%;
    position: relative;
    & > input {
      width: 100%;
      border-radius: 5px;
      height: 32px;
      padding: 0 1rem;
      padding-right: 3rem;
      background: ${brandingColor.common[1]};
      color: ${brandingColor.common[6]};
      font-weight: bold;
    }

    & > button {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: ${brandingColor.common[6]};
      transition: 0.2s ease-in-out;

      &:hover {
        color: ${brandingColor.main[6]};
      }
    } 
  }
`;

const SearchBar = ({
  searchType,
  searchQuery,
  onChangeSearchType,
  onChangeSearchField,
  onEnterKeyPress,
  onSearch,
}) => {
  const [toggle, onToggle] = useToggle();

  return (
    <SearchBarWrap>
      <DropBox
        visible={toggle.activeToggle === 'SearchType'}
        top="32px"
        side="left"
        main={<SearchOption onToggle={onToggle} searchType={searchType} />}
        list={<SearchOptionList onChangeSearchType={onChangeSearchType} />}
      />
      <fieldset>
        <input
          type="text"
          name="search_query"
          onChange={(e) => onChangeSearchField(e)}
          onKeyPress={(e) => onEnterKeyPress(e)}
          value={searchQuery}
        />
        <button
          type="button"
          onClick={(e) => onSearch(e)}
        >
          <IoMdSearch />
        </button>
      </fieldset>
    </SearchBarWrap>
  );
};

export default SearchBar;