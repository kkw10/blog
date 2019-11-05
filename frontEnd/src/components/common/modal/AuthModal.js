import React from 'react';
import Modal from './index';
import AuthFormContainer from '../../../containers/auth/AuthFormContainer';

const Register = ({ visible, type, onCancel, title, description }) => {
  return (
    <Modal
      type={ type }
      visible={ visible }
      title={ title }
      description={ description }  
      onCancel={ onCancel }
    >
      <AuthFormContainer type={type} />
    </Modal>
  )
}

export default Register;