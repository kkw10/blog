import React from 'react';
import styled from 'styled-components';
import { FaHashtag } from 'react-icons/fa';
import { MdShortText } from 'react-icons/md';
import { brandingColor } from '../../../lib/styles/branding';

const SearchOptionListWrap = styled.ul`
  background: #fff;
  width: 180px;
  & > li {
    cursor: pointer;
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

const SearchOptionList = ({
  onChangeSearchType,
}) => {
  return (
    <SearchOptionListWrap>
      <li onClick={() => onChangeSearchType('tag')}>
        <FaHashtag />
        <span>태그검색</span>
      </li>
      <li onClick={() => onChangeSearchType('contents')}>
        <MdShortText />
        <span>제목 + 내용검색</span>
      </li>
    </SearchOptionListWrap>
  )
};

export default SearchOptionList;