import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoMdCreate, IoMdListBox } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import { FaUserAstronaut } from 'react-icons/fa';

// Component...
import Responsive from './Responsive';
import Button from './Button';
import AuthModal from './modal/AuthModal';
import SearchBar from './SearchBar';

// lib...
import { brandingColor } from '../../lib/styles/branding';

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

  .left {
    display: flex;
    align-items: center;
    width: 100%;
    padding-right: 2rem;

    & > h1 {
      margin-right: 2rem;
    }
    
    & > .search-bar {
      width: 100%;
    }
  }

  .right {
    display: flex;

    & > *:nth-child(2n) {
      margin-left: 10px;
    }
  }
`;

const Tools = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  background: ${brandingColor.common[2]};
  padding: 0 1rem;
  border-radius: 5px;

  svg {
    cursor: pointer;
  }

  & > a {
    margin-right: 1rem;
    
  }

  & > a:last-child {
    margin-right: 0;
  }

  .create_button,
  .list_button,
  .liked_button {
    color: ${brandingColor.point[6]};
    transition: 0.2s ease-in-out;
    &:hover {
      color: ${brandingColor.main[7]};
    }
  }
`;

const ProfileButton = styled(Link)`
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
  margin-right: 0.5rem;

  svg {
    margin-right: 1rem;
  }
  &:hover {
    color: ${brandingColor.main[7]};
  }
`;

const Spacer = styled.div`
  height: 3rem;
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
        <div className="left">
          <h1>
            <Link to="/" className="logo">SPACER</Link>
          </h1>
          <div className="search-bar">
            <SearchBar />
          </div>
        </div>
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
              <Link className="list_button" to={`/posts/user/${user.id}`}>
                <IoMdListBox />
              </Link>
              <Link className="liked_button" to="/posts/liked">
                <AiFillStar />
              </Link>
            </Tools>
            <ProfileButton to={`/profile/${user.id}`}>
              <FaUserAstronaut />
              <span>{user.nickname}</span>
            </ProfileButton>
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
