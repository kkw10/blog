import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  initializeForm,
  register,
} from '../../models/actions/auth';
import {
  check,
} from '../../models/actions/user';

const AuthFormContainer = ({ type, history }) => {
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  const form = useSelector(({ auth }) => auth.register);

  const { result, error, user } = useSelector(({ auth, user }) => ({
    result: auth.result,
    error: auth.error,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'register',
      key: name,
      value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      nickname,
      password,
      passwordConfirm,
    } = form;

    if ([email, nickname, password, passwordConfirm].includes('')) {
      setFormError('빈칸을 모두 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setFormError('비밀번호가 일치하지 않습니다.');
      return;
    }

    dispatch(register({ email, nickname, password }));
  };

  useEffect(() => {
    if (error) {
      if (error.response.status === 409) {
        setFormError('이미 존재하는 계정입니다.');
        return;
      }

      setFormError('회원가입 실패.');
      return;
    }

    if (result) {
      console.log('회원가입 성공');
      console.log(result);
      dispatch(check());
    }
  }, [result, error, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(initializeForm(type));
    setFormError(null);
  }, [dispatch]);

  useEffect(() => {
    if (user) history.push('/');
  }, [user, history]);

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

export default withRouter(AuthFormContainer);
