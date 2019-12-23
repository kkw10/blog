import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  initializeForm,
  register,
} from '../../models/actions/auth';
import { check } from '../../models/actions/user';
import { clearToggle } from '../../models/actions/toggle';

// lib...
import {
  initForm,
  emailValidate,
  nickValidate,
  passwordValidate,
  passwordCheckValidate,
} from '../../lib/util/validation';

const AuthFormContainer = ({ type, history }) => {
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(null);
  const [emailError, setEmailError] = useState(initForm);
  const [nickError, setNickError] = useState(initForm);
  const [passwordError, setPasswordError] = useState(initForm);
  const [passwordCheckError, setPasswordCheckError] = useState(initForm);
  const form = useSelector(({ auth }) => auth.register);
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

    if (name === 'nickname') {
      isError = nickValidate(value);
      setNickError(isError);
    }

    if (name === 'password') {
      isError = passwordValidate(value);
      setPasswordError(isError);
    }

    if (name === 'passwordConfirm') {
      isError = passwordCheckValidate(value, form.password);
      setPasswordCheckError(isError);
    }
  }, [form]);

  // form input change 함수
  const onChange = useCallback((e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      form: 'register',
      key: name,
      value,
    }));

    onValidate(name, value);
  }, [onValidate]);

  const onSubmit = useCallback((e) => {
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
  }, [form]);

  useEffect(() => { // 에러 체크
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
      dispatch(initializeForm(type));
      dispatch(clearToggle());
    }
  }, [result, error, dispatch]);

  useEffect(() => { // 로컬 스토리지에 유저 저장 및 메인페이지로 이동
    if (user) history.push('/');
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.log('localStorage error...');
    }
  }, [user, history]);

  useEffect(() => { // 초기화
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
      nickError={nickError}
      passwordError={passwordError}
      passwordCheckError={passwordCheckError}
    />
  );
};

export default withRouter(AuthFormContainer);
