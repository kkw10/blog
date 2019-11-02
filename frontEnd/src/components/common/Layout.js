import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { brandingColor } from '../../lib/styles/branding';

const LayoutWrap = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${brandingColor.common[2]};
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrap>
      <Header />
      { children }
    </LayoutWrap>
  )
}

export default Layout;