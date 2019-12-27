import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../containers/common/HeaderContainer';
import { brandingColor } from '../../lib/styles/branding';
import MessageBoxContainer from '../../containers/common/MessageBoxContainer';

const LayoutWrap = styled.div`
  position: absolute;
  width: 100%;
  background: ${brandingColor.common[2]};
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrap>
      <HeaderContainer />
      { children }
      <MessageBoxContainer />
    </LayoutWrap>
  );
};

export default Layout;
