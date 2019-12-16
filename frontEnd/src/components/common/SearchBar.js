import React from 'react';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { FaHashtag } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdShortText } from 'react-icons/md';

// components...
import DropBox from './dropbox';

// lib...
import useToggle from '../../lib/hooks/toggleHook';
import { brandingColor } from '../../lib/styles/branding';

const SearchBarWrap = styled.form`
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

const SearchType = styled.div`
  cursor: pointer;
  width: 220px;
  margin-right: 0.5rem;
  position: relative;

  & > .current-type {
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    border-radius: 5px;
    color: ${brandingColor.common[6]};
    border: 1px solid transparent;
    & > span {
      font-size: 13px;
      font-weight: bold;
      margin-right: 0.3rem;
    }
    &:hover {
      border-color: ${brandingColor.common[4]};
    }
  }
`;

const SearchTypeList = styled.ul`
  background: #fff;
  width: 220px;

  & > li {
    font-size: 12px;
    color: ${brandingColor.common[6]};
    font-weight: bold;
    padding: 0.7rem 0.5rem;
    border-bottom: 1px solid ${brandingColor.common[2]};
    transition: 0.2s ease-in-out;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background: ${brandingColor.point[6]};
      color: #fff;
    }
    & > svg {
      margin-right: 0.5rem;
    }
  }
`;

const SearchBar = () => {
  const [toggle, onToggle] = useToggle();

  return (
    <SearchBarWrap>
      <SearchType>
        <div
          className="current-type"
          onClick={() => onToggle('SearchType')}
        >
          <span>검색 유형</span>
          <TiArrowSortedDown />
        </div>
        <DropBox
          visible={toggle.activeToggle === 'SearchType'}
          top="32px"
          side="left"
        >
          <SearchTypeList>
            <li>
              <FaHashtag />
              <span>태그검색</span>
            </li>
            <li>
              <MdShortText />
              <span>제목 + 내용검색</span>
            </li>
          </SearchTypeList>
        </DropBox>
      </SearchType>
      <fieldset>
        <input type="text" />
        <button type="button">
          <IoMdSearch />
        </button>
      </fieldset>
    </SearchBarWrap>
  );
};

export default SearchBar;