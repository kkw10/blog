import React from 'react';
import styled from 'styled-components';
import { FaUserAstronaut } from 'react-icons/fa';
import { brandingColor } from '../../lib/styles/branding';

const NoContentsWrap = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner-wrap {
    font-size: 40px;
    color: ${brandingColor.common[6]};
    & > svg {
      margin: 0 auto;
      margin-bottom: 2rem;
      display: block;
    }

    & > p {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const NoContents = ({ placeholder }) => {
  return (
    <NoContentsWrap>
      <div className="inner-wrap">
        <FaUserAstronaut />
        <p>{placeholder}</p>
      </div>
    </NoContentsWrap>
  )
};

export default NoContents;