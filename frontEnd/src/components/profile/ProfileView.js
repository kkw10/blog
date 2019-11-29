import React from 'react';
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
  background: url('http://localhost:1991/default_profile_background6.jpg') no-repeat;
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
    color: ${brandingColor.point[6]};
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
  b {
    font-size: 16px;
    color: ${brandingColor.common[6]};
  }
  p {
    text-indent: 10px;
    font-size: 14px;
    line-height: 1.4;
    color: ${brandingColor.common[6]};
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
    }    
  }
  li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ProfileView = ({
  user,
  profile,
}) => {
  return (
    <ProfileViewWrap>
      <BackgroundArea />
      <DataArea>
        <div className="flexWrap">
          <Portrait>
            <div className="absoluteWrap">
              {profile && profile.portrait ? (
                <PortraitImage background={`http://localhost:1991/${profile.portrait}`} />
              ) : (
                <div className="defaultUser">
                  <FaUserAstronaut />
                </div>
              )}
              <h2>{user.nickname}</h2>
            </div>
          </Portrait>
          <Introduce>
            <div className="title">
              <b>{profile && profile.title ? (profile.title) : '제목을 입력해주세요'}</b>
            </div>
            <div className="desc">
              <p>{profile && profile.descript ? (profile.descript) : '내용을 입력해주세요'}</p>
            </div>
          </Introduce>
          <EtcInfo>
            <ul>
              <li>
                <b>
                  <TiLocation />
                  위치
                </b>
                <p>{profile && profile.location ? (profile.location) : '위치를 입력해주세요'}</p>
              </li>
              <li>
                <b>
                  <AiFillFire />
                  관심사
                </b>
                <p>{profile && profile.favorite ? (profile.favorite) : '관심사를 입력해주세요'}</p>
              </li>
              <li>
                <b>
                  <MdEmail />
                  메일
                </b>
                <p>{profile && profile.contact ? (profile.contact) : '연락처를 입력해주세요'}</p>
              </li>
            </ul>
          </EtcInfo>
        </div>
      </DataArea>
    </ProfileViewWrap>
  )
}

export default ProfileView;