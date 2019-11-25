import React from 'react';
import styled from 'styled-components';

const DropBoxWrap = styled.div`
  position: absolute;
  right:0;
  top: ${(props) => (props.top ? props.top : 0)};
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.125);
  padding: 0.5rem 0;
  font-size: 14px;
  z-index: 999;
`;

const DropBox = ({
  children,
  visible,
  top,
}) => {
  if (!visible) return null;

  return (
    <DropBoxWrap top={top}>
      {children}
    </DropBoxWrap>
  );
};

export default DropBox;
