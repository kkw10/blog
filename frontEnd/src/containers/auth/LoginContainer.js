import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  initializeForm,
  login,
} from '../../models/actions/auth';
import { check } from '../../models/actions/user';
import { clearToggle } from '../../models/actions/toggle';

// lib...
import {
  initForm,
  emailValidate,
  passwordValidate,
} from '../../lib/util/validation';

const LoginContainer = ({ type, history }) => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(null);
  const [emailError, setEmailError] = useState(initForm);
  const [passwordError, setPasswordError] = useState(initForm);
  const form = useSelector(({ auth }) => auth.login);
  const { result, error, user } = useSelector(({ auth, user }) => ({
    result: auth.result,
    error: auth.error,
    user: user.user,
  }));

  // 유효성 검사 함수
  const onValidate = useCallback((name, value) => {
    let isError = null;

    if (name === 'email') {
      isError = emailValidate(value);
      setEmailError(isError);
    }

    if (name === 'password') {
      isError = passwordValidate(value);
      setPasswordError(isError);
    }
  }, [form]);

  const onChange = useCallback((e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'login',
      key: name,
      value,
    }));

    onValidate(name, value);
  }, [onValidate]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = form;

    dispatch(login({ email, password }));
  }, [form]);

  useEffect(() => {
    if (error) {
      console.log('오류 발생');
      console.log(error.toString());
      setFormError('로그인 실패');
      return;
    }

    if (result) {
      console.log('로그인 성공');
      console.log(result);
      dispatch(check());
      dispatch(initializeForm(type));
      dispatch(clearToggle());
      history.push('/');
    }
  }, [result, error, dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.log('localStorage error...');
    }

    if (user) history.push('/');
  }, [user, history]);

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
      emailError={emailError}
      passwordError={passwordError}
    />
  );
};

export default withRouter(LoginContainer);
