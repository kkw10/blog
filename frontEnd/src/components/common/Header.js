import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import { brandingColor } from '../../lib/styles/branding';
import AuthModal from './modal/AuthModal';

const HeaderWrap = styled.header`
  height: 3rem;
  padding: 0.5rem 0;
  position: fixed;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid ${brandingColor.common[2]};
`;

const ResponsiveWrap = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    display: flex;

    & > *:nth-child(2n) {
      margin-left: 10px;
    }
  }
`;

const Spacer = styled.div`
  height: 3rem;
`;

const Header = ({
  toggle,
  onToggling,
  user,
}) => {
  return (
    <>
      <HeaderWrap>
        <ResponsiveWrap>
          <h1>
            <Link to="/" className="logo">LOGO</Link>
          </h1>
          {!user ? (
            <div className="right">
              <Button
                placeholder="로그인"
                size="lg"
                onClick={() => onToggling('login')}
              />
              <Button
                placeholder="회원가입"
                size="lg"
                background="point"
                onClick={() => onToggling('register')}
              />
            </div>
          ) : (
            <div className="right">
              <Button
                placeholder="로그아웃"
                size="lg"
                background="point"
              />
            </div>
          )}
        </ResponsiveWrap>
      </HeaderWrap>
      <Spacer />
      {!user ? (
        <>
          <AuthModal
            type="register"
            title="회원가입"
            description="양식을 작성해 주세요."
            visible={!user && toggle.activeToggle === 'register'}
            onCancel={onToggling}
          />
          <AuthModal
            type="login"
            title="로그인"
            description="양식을 작성해 주세요."
            visible={!user && toggle.activeToggle === 'login'}
            onCancel={onToggling}
          />
        </>
      ) : (
        null
      )}
    </>
  );
};

export default Header;
