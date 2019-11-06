import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  initializeForm,
  login,
} from '../../models/actions/auth';

const LoginContainer = ({ type }) => {
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  const form = useSelector(({ auth }) => auth.login);

  const { result, error } = useSelector(({ auth }) => ({
    result: auth.result,
    error: auth.error,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'login',
      key: name,
      value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      email, password,
    } = form;

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      console.log('오류 발생');
      console.log(error.toString());
      setFormError('로그인 실패')
      return;
    }

    if (result) {
      console.log('로그인 성공');
      console.log(result);
    }
  }, [result, error]);

  useEffect(() => {
    dispatch(initializeForm(type));
    setFormError(null);
  }, [dispatch]);

  return (
    <AuthForm
      type={type}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={formError}
    />
  );
};

export default LoginContainer;
