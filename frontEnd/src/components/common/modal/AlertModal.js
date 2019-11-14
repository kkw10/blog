import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

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

  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const AlertModalWrap = styled.div`
  position: relative;
  background: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
`;

const Buttons = styled.div`
  display: flex;
  button + button {
    margin-left: 0.3rem;
  }
`;

const AlertModal = ({
  visible,
  description,
  onCancel,
  onSubmit,
}) => {
  if (!visible) return null;

  const onClick = () => {
    onSubmit();
    onCancel('alert');
  };

  return (
    <Overlay>
      <AlertModalWrap>
        <h2>경고!</h2>
        <p>{description}</p>
        <Buttons>
          <Button
            placeholder="삭제"
            size="mx"
            background="point"
            onClick={onClick}
          />
          <Button
            placeholder="취소"
            size="mx"
            onClick={() => onCancel('alert')}
          />
        </Buttons>
      </AlertModalWrap>
    </Overlay>
  );
};

export default AlertModal;
