import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const ErrorWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 3rem);
  width :100%;
  & > div {
    display:flex;
    align-items: center;
    font-size: 100px;
    color: ${brandingColor.point[6]};
    & > b {
      font-size: 20px;
      margin-left: 1rem;
    }
  }
`;

const Error = ({ currentError }) => {
  return (
    <ErrorWrap>
      <div>
        <FaUserAstronaut />
        <b>{currentError && currentError.message}</b>
      </div>
    </ErrorWrap>
  )
};

export default Error;