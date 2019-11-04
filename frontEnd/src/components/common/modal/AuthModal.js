import React from 'react';
import Modal from './index';
import AuthForm from '../../auth/AuthForm';

const Register = ({ visible, type, onCancel, title, description }) => {
  return (
    <Modal
      type={ type }
      visible={ visible }
      title={ title }
      description={ description }  
      onCancel={ onCancel }
    >
      <AuthForm type={type} />
    </Modal>
  )
}

export default Register;