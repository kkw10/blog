import React from 'react';
import Modal from './index';
import LoginContainer from '../../../containers/auth/LoginContainer';
import RegisterContainer from '../../../containers/auth/RegisterContainer';

const Register = ({
  visible,
  type,
  onCancel,
  title,
  description,
}) => (
  <Modal
    type={type}
    visible={visible}
    title={title}
    description={description}
    onCancel={onCancel}
  >
    {type === 'register' ? (
      <RegisterContainer type={type} />
    ) : (
      <LoginContainer type={type} />
    )}
  </Modal>
);

export default Register;
