import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  initializeForm,
  register,
  login,
} from '../../models/actions/auth';

const AuthFormContainer = ({ type }) => {
  const dispatch = useDispatch();
  const { registerForm, loginForm } = useSelector(({ auth }) => ({
    registerForm: auth.register,
    loginForm: auth.login,
  }));
  const { result, error } = useSelector(({ auth }) => ({
    result: auth.result,
    error: auth.error,
  }));
  let form = null;
  let onChange = null;
  let onSubmit = null;

  const onChangeRegister = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'register',
      key: name,
      value,
    }));
  };

  const onChangeLogin = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'login',
      key: name,
      value,
    }));
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    const {
      email, nickname, password, passwordConfirm,
    } = form;

    if (password !== passwordConfirm) {
      return;
    }

    dispatch(register({ email, nickname, password }));
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const {
      email, password,
    } = form;

    dispatch(login({ email, password }));
  };

  if (type === 'register') {
    form = registerForm;
    onChange = onChangeRegister;
    onSubmit = onSubmitRegister;
  } else {
    form = loginForm;
    onChange = onChangeLogin;
    onSubmit = onSubmitLogin;
  }

  useEffect(() => {
    dispatch(initializeForm(type));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log('오류 발생');
      console.log(error);
      return;
    }

    if (result) {
      console.log('회원가입 성공');
      console.log(result);
    }
  }, [result, error]);

  return (
    <AuthForm
      type={type}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default AuthFormContainer;
