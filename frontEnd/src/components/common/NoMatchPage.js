import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const NoMatchPageWrap = styled.div`
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

const NoMatchPage = () => {
  return (
    <NoMatchPageWrap>
      <div>
        <FaUserAstronaut />
        <b>404, 존재하지 않는 페이지 입니다.</b>
      </div>
    </NoMatchPageWrap>
  )
};

export default NoMatchPage;