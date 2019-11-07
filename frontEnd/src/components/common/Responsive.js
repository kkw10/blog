import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const ResponsiveBlock = styled.div`
  padding: 0 1rem;
  width: 100%;
  margin: 0 auto;
  background: ${brandingColor.common[2]};

  max-width: ${(props) => (props.maxWidth)}px;
`;

const Responsive = ({ children, ...rest }) => (
  <ResponsiveBlock {...rest}>
    {children}
  </ResponsiveBlock>
);


export default Responsive;
