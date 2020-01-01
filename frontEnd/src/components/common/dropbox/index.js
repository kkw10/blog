import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropBoxWrap = styled.div`
  & > .main {
    position: relative;
  }
`;

const List = styled.div`
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
  visible,
  top, // list position => top
  side, // list position => left, right
  main,
  list,
}) => {
  const modalMarker = useRef();

  useEffect(() => {
    const nodes = modalMarker.current.querySelectorAll('*');
    modalMarker.current.setAttribute('data-this-is-toggle-element', true);
    nodes.forEach((v) => v.setAttribute('data-this-is-toggle-element', true));
  }, [main, list]);

  return (
    <DropBoxWrap
      ref={modalMarker}
      top={top}
      side={side}
    >
      <div className="main">
        {main}
        {visible && (
          <List top={top} side={side}>
            {list}
          </List>
        )}
      </div>
    </DropBoxWrap>
  );
};

export default DropBox;
