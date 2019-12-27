import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../../lib/styles/branding';

const MessageBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0.5rem 1rem;
  background: ${brandingColor.common[6]};
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  position: fixed;
  left: 1rem;
  bottom: -100rem;
  z-index: 9999;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;

  ${(props) => (
    props.visible ? (
      'bottom: 1rem;'
    ) : (
      'bottom: -100rem;'
    )
  )}
`;

const MessageBox = ({ visible, message }) => {
  return (
    <MessageBoxWrap className="test" visible={visible}>
      {message}
    </MessageBoxWrap>
  );
};

export default MessageBox;
