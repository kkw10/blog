import React from 'react';
import styled from 'styled-components';
import { FaUserAstronaut } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TiLocation } from 'react-icons/ti';
import { AiFillFire } from 'react-icons/ai';
import { brandingColor } from '../../lib/styles/branding';

const UserCardWrap = styled.div`
  border-radius: 5px;
  background: #fff;
  overflow: hidden;

  & .header {
    height: 100px;
    background: url('http://localhost:1991/default_profile_background.jpg') no-repeat;
    background-size: cover;
    position: relative;

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
    min-height: 300px;
    padding: 1rem;
    padding-top: 4rem;
    color: ${brandingColor.common[6]};

    & > .nickname {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: ${brandingColor.point[6]};
    }

    & > .profile {
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

const UserCard = ({ user, profile }) => {
  return (
    <UserCardWrap>
      <div className="header">
        {profile && profile.portrait ? (
          <UserPortrait className="user" background={`http://localhost:1991/${profile.portrait}`} />
        ) : (
          <div className="user user_default">
            <FaUserAstronaut />
          </div>
        )}
      </div>
      <div className="body">
        <div className="nickname">
          {user && user.nickname ? (user.nickname) : null}
        </div>
        <ul className="profile">
          <li>
            <b><TiLocation />위치</b>
            {profile && profile.location ? (profile.location) : null}
          </li>
          <li>
            <b><AiFillFire />관심사</b>
            {profile && profile.favorite ? (profile.favorite) : null}
          </li>
          <li>
            <b><MdEmail />연락처</b>
            {profile && profile.contact ? (profile.contact) : null}
          </li>
        </ul>
      </div>
    </UserCardWrap>
  )
};

export default UserCard;
