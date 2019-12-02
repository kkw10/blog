import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdEmail } from 'react-icons/md';
import { TiLocation } from 'react-icons/ti';
import { AiFillFire } from 'react-icons/ai';
import { FaUserAstronaut } from 'react-icons/fa';
import { brandingColor } from '../../lib/styles/branding';

const ProfileViewWrap = styled.div`
  border-radius: 5px;
  position: relative;
`;

const BackgroundArea = styled.div`
  border-radius: 5px 5px 0 0;
  height: 250px;
  background: url('http://localhost:1991/default_profile_background.jpg') no-repeat;
  background-size: cover;
  background-position-y: 30%;
  border-bottom: 10px solid ${brandingColor.main[7]};
`;

const DataArea = styled.div`
  width: 100%;
  border-top: 10px solid ${brandingColor.main[4]};
  border-radius: 0 0 5px 5px;
  background: #fff;
  padding-bottom: 3rem;

  .flexWrap {
    padding: 0 3rem;
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
`;

const Portrait = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 3rem;
  border-radius: 5px;
  min-width: 200px;
  position: relative;
  h2 {
    font-size: 20px;
    color: ${brandingColor.common[6]};
    margin-top: 1rem;
    text-align: center;
  }
  .absoluteWrap {
    position: absolute;
    top: -110px;
    width: 100%;
  }
  .defaultUser {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background: ${brandingColor.common[4]};
    border-radius: 15px;
    color: #fff;
    svg {
      font-size: 60px;
    }
  }  
`;

const PortraitImage = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background: ${(props) => `url(${props.background})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Introduce = styled.div`
  width: calc(100% - 480px);
  margin-right: 2rem;
  color: ${brandingColor.common[6]};
  b {
    font-size: 16px;
    color: ${brandingColor.point[6]};
  }
  p {
    text-indent: 10px;
    font-size: 14px;
    line-height: 1.4;
  }

  .title {
    margin-bottom: 1.5rem;
    padding-right: 1rem;
  }
  .desc {
    max-height: 350px;
    overflow: auto;
    padding-right: 1rem;
  }
`;

const EtcInfo = styled.div`
  width: 280px;

  li {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${brandingColor.common[3]};
    
    &::after {
      content: '';
      display: block;
      clear: both;
    }

    b {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: ${brandingColor.common[6]};
      svg {
        margin-right: 0.5rem;
      }
    }
    p {
      font-size: 12px;
      margin-top: 1rem;
      color: ${brandingColor.common[6]};
      float: right;
    }    
  }
  li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const Followers = styled.ul`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  margin-top: 9rem;

  & > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    padding: 0.25rem;
    margin: 0.25rem;
    color: #fff;
    height: 60px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    b {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .followers {
    background: ${brandingColor.main[6]};
  }
  .followings {
    background: ${brandingColor.point[6]};
  }
`;

const ProfileView = ({ currentUser }) => {
  if (!currentUser) return null;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])

  return (
    <ProfileViewWrap>
      <BackgroundArea />
      <DataArea>
        <div className="flexWrap">
          <Portrait>
            <div className="absoluteWrap">
              {currentUser.portrait ? (
                <PortraitImage background={`http://localhost:1991/${currentUser.portrait}`} />
              ) : (
                <div className="defaultUser">
                  <FaUserAstronaut />
                </div>
              )}
              <h2>{currentUser.nickname}</h2>
            </div>
            {currentUser ? (
              <Followers>
                <li className="followers">
                  <b>팔로워</b>
                  <span>{currentUser.Followers.length}</span>
                </li>
                <li className="followings">
                  <b>팔로잉</b>
                  <span>{currentUser.Followings.length}</span>
                </li>
              </Followers>
            ) : null}
          </Portrait>
          <Introduce>
            <div className="title">
              <b>{currentUser.title ? (currentUser.title) : '제목을 입력해주세요'}</b>
            </div>
            <div className="desc">
              <p>{currentUser.descript ? (currentUser.descript) : '내용을 입력해주세요'}</p>
            </div>
          </Introduce>
          <EtcInfo>
            <ul>
              <li>
                <b>
                  <TiLocation />
                  위치
                </b>
                <p>{currentUser.location ? (currentUser.location) : '위치를 입력해주세요'}</p>
              </li>
              <li>
                <b>
                  <AiFillFire />
                  관심사
                </b>
                <p>{currentUser.favorite ? (currentUser.favorite) : '관심사를 입력해주세요'}</p>
              </li>
              <li>
                <b>
                  <MdEmail />
                  메일
                </b>
                <p>{currentUser.contact ? (currentUser.contact) : '연락처를 입력해주세요'}</p>
              </li>
            </ul>
          </EtcInfo>
        </div>
      </DataArea>
    </ProfileViewWrap>
  )
}

export default ProfileView;