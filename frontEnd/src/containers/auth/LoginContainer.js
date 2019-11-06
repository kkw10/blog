import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  initializeForm,
  login,
} from '../../models/actions/auth';
import {
  check,
} from '../../models/actions/user';
import {
  toggling,
} from '../../models/actions/toggle';

const LoginContainer = ({ type, history }) => {
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  const form = useSelector(({ auth }) => auth.login);

  const { result, error, user } = useSelector(({ auth, user }) => ({
    result: auth.result,
    error: auth.error,
    user: user.user,
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
      email,
      password,
    } = form;

    dispatch(login({ email, password }));
  };

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
      dispatch(toggling(''));
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
    />
  );
};

export default withRouter(LoginContainer);
