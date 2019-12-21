import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserAstronaut } from 'react-icons/fa';
import { IoMdHome, IoMdListBox } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { TiLocation, TiArrowBack } from 'react-icons/ti';
import { AiFillFire } from 'react-icons/ai';
import { brandingColor } from '../../lib/styles/branding';
import Button from './Button';

const UserCardWrap = styled.div`
  border-radius: 5px;
  background: #fff;
  overflow: hidden;

  & .header {
    height: 100px;
    background: url('http://localhost:1991/default_profile_background.jpg') no-repeat;
    background-size: cover;
    position: relative;

    .reset {
      position: absolute;
      right: 1rem;
      top: 1rem;
      font-size: 22px;
      color: #fff;
      transition: 0.2s ease-in-out;
      &:hover {
        color: ${brandingColor.point[7]};
      }
    }

    .home {
      position: absolute;
      right: 3rem;
      top: 8rem;
      font-size: 30px;
      color: ${brandingColor.common[6]};
      &:hover {
        color: ${brandingColor.point[6]};
      }
    }

    .list {
      position: absolute;
      left: 3rem;
      top: 8rem;
      font-size: 30px;
      color: ${brandingColor.common[6]};
      &:hover {
        color: ${brandingColor.point[6]};
      }
    }

    .user {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);
      border-radius: 15px;
      width: 100px;
      height: 100px;
    }

    .user_default {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${brandingColor.common[4]};
      color: #fff;
      svg {
        font-size: 60px;
      }      
    }
  }
  & .body {
    background: #fff;
    padding: 1rem;
    padding-top: 4rem;
    color: ${brandingColor.common[6]};

    .guest {
      text-align: center;
      min-height: 50px;
      font-size: 14px;
      font-weight: bold;
    }

    .member > .nickname {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: ${brandingColor.point[6]};
    }

    .member > .profile {
      padding: 1rem;

      & > li {
        font-size: 12px;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${brandingColor.common[2]};
        text-align: right;

        b {
          display: flex;
          align-items: center;
          svg { margin-right: 0.5rem };
          margin-bottom: 0.3rem;
          text-align: left;
        }
      }
      & > li:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
`;

const UserPortrait = styled.div`
  background: ${(props) => `url(${props.background})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; 
`;

const FollowButton = styled.div`
  margin-top: 0.5rem;
  & > button {
    width: 100%;
    height: 32px;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    &.follow {
      border: 1px solid ${brandingColor.point[7]};
      background: ${brandingColor.point[7]};
      &:hover {
        background: #fff;
        color: ${brandingColor.point[7]};
        border-color: ${brandingColor.point[7]};
      }      
    }
    &.unfollow {
      border: 1px solid ${brandingColor.main[7]};
      background: ${brandingColor.main[7]};
      &:hover {
        background: #fff;
        color: ${brandingColor.main[7]};
        border-color: ${brandingColor.main[7]};
      }      
    }

    & > svg {
      font-size: 20px;
      margin-right: 0.2rem;
    }
  };
`;

const FollowNumber = styled.ul`
  display: flex;
  border: 1px solid ${brandingColor.common[3]};
  border-radius: 5px;
  margin: 0.5rem 0;
  margin-bottom: 1rem;
  & > li {
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    b {
      margin-right: 0.3rem;
    }
    &.follower {
      color: ${brandingColor.point[6]};
      border-right: 1px solid ${brandingColor.common[3]};
    }
    &.following {
      color: ${brandingColor.main[6]}
    }
  }
`;

const UserCard = ({
  me,
  currentUser,
  onResetStranger,
  onFollow,
}) => {
  return (
    <UserCardWrap>
      <div className="header">
        {currentUser && currentUser.portrait ? (
          <UserPortrait className="user" background={`http://localhost:1991/${currentUser.portrait}`} />
        ) : (
          <div className="user user_default">
            <FaUserAstronaut />
          </div>
        )}
        {currentUser && currentUser.id ? (
          <>
            <Link className="home" to={`/profile/${currentUser.id}`}>
              <IoMdHome />
            </Link>
            <Link className="list" to={`/posts/user/${currentUser.id}`}>
              <IoMdListBox />
            </Link>
          </>
        ) : null}
        {me && currentUser && !currentUser.isMe ? (
          <>
            <button
              type="button"
              className="reset"
              onClick={onResetStranger}
            >
              <TiArrowBack />
            </button>
          </>
        ) : null}
      </div>
      <div className="body">
        {currentUser ? (
          <div className="member">
            <div className="nickname">
              {currentUser.nickname ? (currentUser.nickname) : null}
            </div>
            <ul className="profile">
              <li>
                <b>
                  <TiLocation />
                  위치
                </b>
                {currentUser.location ? (currentUser.location) : null}
              </li>
              <li>
                <b>
                  <AiFillFire />
                  관심사
                </b>
                {currentUser.favorite ? (currentUser.favorite) : null}
              </li>
              <li>
                <b>
                  <MdEmail />
                  연락처
                </b>
                {currentUser.contact ? (currentUser.contact) : null}
              </li>
            </ul>
            <FollowNumber>
              <li className="follower">
                <b>팔로워</b>
                {(currentUser.followers && currentUser.followers) || 0}
              </li>
              <li className="following">
                <b>팔로잉</b>
                {(currentUser.followings && currentUser.followings) || 0}
              </li>
            </FollowNumber>
            {me && !currentUser.isMe ? (
              <div className="buttons">
                <FollowButton>
                  {currentUser.isFollowed ? (
                    <Button
                      placeholder="언팔로우"
                      loadingType="user/FOLLOW"
                      size="mx"
                      background="main"
                      onClick={() => onFollow('unfollow', currentUser.id)}
                    />
                  ) : (
                    <Button
                      placeholder="팔로우"
                      loadingType="user/FOLLOW"
                      size="mx"
                      background="point"
                      onClick={() => onFollow('follow', currentUser.id)}
                    />
                  )}
                </FollowButton>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="guest">로그인이 필요합니다.</div>
        )}
      </div>
    </UserCardWrap>
  );
};

export default UserCard;
