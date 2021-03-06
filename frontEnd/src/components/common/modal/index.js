import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { brandingColor } from '../../../lib/styles/branding';

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrap = styled.div`
  position: relative;
  background: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);

  .cancel_button {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    font-size: 25px;
    cursor: pointer;
  }

  & > h2 {
    margin-bottom: 1.5rem;
  }

  & > p {
    margin-bottom: 2rem;
    color: ${brandingColor.common[6]};
  }
`;

const Modal = ({
  type,
  visible,
  title,
  description,
  onCancel,
  children,
}) => {
  if (!visible) return null;

  const modalMarker = useRef();

  useEffect(() => {
    const nodes = modalMarker.current.querySelectorAll('*');
    modalMarker.current.setAttribute('data-this-is-toggle-element', true);
    nodes.forEach((v) => v.setAttribute('data-this-is-toggle-element', true));
  }, [children]);

  return (
    <Overlay>
      <ModalWrap ref={modalMarker}>
        <IoMdClose
          className="cancel_button"
          onClick={() => onCancel(type)}
        />
        <h2>{ title }</h2>
        <p>{ description }</p>
        { children }
      </ModalWrap>
    </Overlay>
  );
};

export default Modal;
