import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoMdCreate } from 'react-icons/io';
import { FaUserAstronaut } from 'react-icons/fa';
import Responsive from './Responsive';
import Button from './Button';
import { brandingColor } from '../../lib/styles/branding';
import AuthModal from './modal/AuthModal';

const HeaderWrap = styled.header`
  height: 3rem;
  padding: 0.5rem 0;
  position: fixed;
  z-index: 999;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid ${brandingColor.common[2]};
`;

const ResponsiveWrap = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;

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

const Tools = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  svg {
    cursor: pointer;
  }

  .create_button {
    color: ${brandingColor.point[6]};
    margin-right: 1rem;
    transition: 0.2s ease-in-out;
    &:hover {
      color: ${brandingColor.main[7]};
    }
  }

  .profile_button {
    width: 120px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    border: 1px solid ${brandingColor.point[7]};
    border-radius: 5px;
    color: #fff;
    background: ${brandingColor.point[7]};
    transition: 0.2s ease-in-out;

    svg {
      margin-right: 1rem;
    }
    &:hover {
      color: ${brandingColor.main[7]};
    }
  }
`;

const Header = ({
  toggle,
  onToggling,
  onLogout,
  user,
}) => (
  <>
    <HeaderWrap>
      <ResponsiveWrap>
        <h1>
          <Link to="/" className="logo">SPACER</Link>
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
            <Tools>
              <Link className="create_button" to="/write">
                <IoMdCreate />
              </Link>
              <Link className="profile_button" to={`/profile/${user.id}`}>
                <FaUserAstronaut />
                <span>{user.nickname}</span>
              </Link>
            </Tools>
            <Button
              placeholder="로그아웃"
              size="lg"
              onClick={onLogout}
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

export default Header;
