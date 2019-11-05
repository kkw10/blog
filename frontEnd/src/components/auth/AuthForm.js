import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { brandingColor } from '../../lib/styles/branding';

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
`;

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
}) => (
  <AuthFormWrap>
    <form onSubmit={onSubmit}>
      <input
        autoComplete="email"
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={onChange}
      />
      {type === 'register' && (
        <input
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={onChange}
        />
      )}
      <input
        name="password"
        placeholder="비밀번호"
        type="password"
        value={form.password}
        onChange={onChange}
      />
      {type === 'register' && (
        <input
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={form.passwordConfirm}
          onChange={onChange}
        />
      )}
      <Button
        placeholder={type === 'login' ? '로그인' : '회원가입'}
        size="mx"
        background="point"
      />
    </form>
  </AuthFormWrap>
);

export default AuthForm;
