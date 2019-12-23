import React from 'react';
import styled from 'styled-components';
import { FaHashtag } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdShortText } from 'react-icons/md';
import { brandingColor } from '../../../lib/styles/branding';

const SearchOptionWrap = styled.div`
  cursor: pointer;
  width: 180px;
  margin-right: 0.5rem;
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  border-radius: 5px;
  color: ${brandingColor.common[6]};
  border: 1px solid transparent;
  &:hover {
    border-color: ${brandingColor.common[4]};
  }

  .current-type {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
  
    & > svg {
      margin-right: 0.5rem;
    }
  }
`;

const SearchOption = ({ onToggle, searchType }) => {
  return (
    <SearchOptionWrap
      onClick={() => onToggle('SearchType')}
    >
      {searchType === 'tag' ? (
        <>
          <div className="current-type">
            <FaHashtag />
            <span>태그검색</span>
          </div>
          <TiArrowSortedDown />
        </>
      ) : (
        <>
          <div className="current-type">
            <MdShortText />
            <span>제목 + 내용검색</span>
          </div>
          <TiArrowSortedDown />
        </>
      )}
    </SearchOptionWrap>
  );
};

export default SearchOption;
