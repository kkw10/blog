import React from 'react';
import styled from 'styled-components';
import Modal from './index';
import Button from '../Button';

const InfoModal = ({
  visible,
  onCancel,
  title,
  description,
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      description={description}
      onCancel={onCancel}
    >
      <Button
        placeholder="확인"
        size="mx"
        background="point"
        onClick={onCancel}
      />
    </Modal>
  );
};

export default InfoModal;