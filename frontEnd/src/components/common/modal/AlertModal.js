import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Modal from './index';

const Buttons = styled.div`
  display: flex;
  button + button {
    margin-left: 0.3rem;
  }
`;

const AlertModal = ({
  visible,
  title,
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
    <Modal
      visible={visible}
      title={title}
      description={description}
      onCancel={onCancel}
    >
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
          onClick={onCancel}
        />
      </Buttons>
    </Modal>
  );
};

export default AlertModal;
