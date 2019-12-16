import React from 'react';
import styled from 'styled-components';

const DropBoxWrap = styled.div`
  position: absolute;
  top: ${(props) => (props.top ? props.top : 0)};
  ${(props) => (
    props.side === 'left' ? 'left: 0;' : 'right: 0;'
  )};
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.125);
  font-size: 14px;
  z-index: 999;
  overflow: hidden;
`;

const DropBox = ({
  children,
  visible,
  top,
  side,
}) => {
  if (!visible) return null;

  return (
    <DropBoxWrap
      top={top}
      side={side}
    >
      {children}
    </DropBoxWrap>
  );
};

export default DropBox;
