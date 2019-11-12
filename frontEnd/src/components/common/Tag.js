import React from 'react';
import styled from 'styled-components';
import { FaHashtag } from 'react-icons/fa';
import { brandingColor } from '../../lib/styles/branding';

const TagWrap = styled.div`
  background: ${brandingColor.main[6]};
  padding: 5px 7px;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  font-size: 11px;

  & svg {
    font-size: 11px;
    color: #fff;
    margin-right: 5px;
  }
`;

const Tag = ({ name }) => {
  return (
    <TagWrap>
      <FaHashtag />
      {name}
    </TagWrap>
  );
};

export default Tag;
