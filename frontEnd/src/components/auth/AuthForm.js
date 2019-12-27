import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { brandingColor } from '../../lib/styles/branding';

// components...
import AuthFieldset from './AuthFieldset';

const AuthFormWrap = styled.div`
  width: 320px;
  
  input {
    display: block;
    width: 100%;
    padding: 0.3rem;
    max-width: 360px;
    width: 100%;
    height: 36px;
    font-size: 14px;
    border: 1px solid ${brandingColor.common[3]};
    border-radius: 5px;
    margin-bottoM: 0.5rem;
    &:focus {
      border-color: ${brandingColor.point[5]};
    }
  }

  button {
    margin-top: 0.5rem;
  }

  & > form {
    & > fieldset {
      position: relative;
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${brandingColor.red[6]};
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  error,
  emailError,
  nickError,
  passwordError,
  passwordCheckError,
}) => (
  <AuthFormWrap>
    <form onSubmit={onSubmit}>
      <AuthFieldset
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={onChange}
        validationError={emailError.result}
        validationMessage={emailError.message}
      />
      {type === 'register' && (
        <AuthFieldset
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={onChange}
          validationError={nickError.result}
          validationMessage={nickError.message}
        />
      )}
      <AuthFieldset
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={onChange}
        validationError={passwordError.result}
        validationMessage={passwordError.message}
      />
      {type === 'register' && (
        <AuthFieldset
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          value={form.passwordConfirm}
          onChange={onChange}
          validationError={passwordCheckError.result}
          validationMessage={passwordCheckError.message}
        />
      )}
      {error && <ErrorMessage>{ error }</ErrorMessage>}
      <Button
        placeholder={type === 'login' ? '로그인' : '회원가입'}
        size="mx"
        background="point"
        loadingType={type === 'login' ? 'auth/LOGIN' : 'auth/REGISTER'}
      />
    </form>
  </AuthFormWrap>
);

export default AuthForm;
