import React, { useCallback } from 'react';
import styled from 'styled-components';
import { MdEmail } from 'react-icons/md';
import { TiLocation } from 'react-icons/ti';
import { AiFillFire } from 'react-icons/ai';
import { FaUserAstronaut } from 'react-icons/fa';
import { brandingColor } from '../../lib/styles/branding';

// Component...
import Modal from '../common/modal';
import FollowViewContainer from '../../containers/profile/FollowViewContainer';

// lib...
import useToggle from '../../lib/hooks/toggleHook';

const ProfileViewWrap = styled.div`
  border-radius: 5px;
  position: relative;
`;

const BackgroundArea = styled.div`
  border-radius: 5px 5px 0 0;
  height: 250px;
  background: url('http://localhost:1991/uploads/default_profile_background.jpg') no-repeat;
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
    cursor: pointer;
    b {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .followers {
    transition: 0.2s ease-in-out;
    background: ${brandingColor.main[6]};
    &:hover {
      border: 1px solid ${brandingColor.main[6]};
      color: ${brandingColor.main[6]};
      background: #fff;
    }
  }
  .followings {
    transition: 0.2s ease-in-out;
    background: ${brandingColor.point[6]};
    &:hover {
      border: 1px solid ${brandingColor.point[6]};
      color: ${brandingColor.point[6]};
      background: #fff;
    }
  }
`;

const ProfileView = ({
  currentUser,
  FollowersList,
  FollowingsList,
  onReadFollowList,
  onUnfollowFromList,
}) => {
  if (!currentUser) return null;
  const [toggle, onToggle] = useToggle();

  const followerClickHandler = useCallback(() => {
    onReadFollowList('followers', currentUser.id);
    onToggle('FollowersList');
  }, [currentUser]);

  const followingClickHandler = useCallback(() => {
    onReadFollowList('followings', currentUser.id);
    onToggle('FollowingsList');
  }, [currentUser]);

  return (
    <ProfileViewWrap>
      <BackgroundArea />
      <DataArea>
        <div className="flexWrap">
          <Portrait>
            <div className="absoluteWrap">
              {currentUser.portrait ? (
                <PortraitImage background={`http://localhost:1991/uploads/${currentUser.portrait}`} />
              ) : (
                <div className="defaultUser">
                  <FaUserAstronaut />
                </div>
              )}
              <h2>{currentUser.nickname}</h2>
            </div>
            {currentUser ? (
              <Followers>
                <li className="followers" onClick={followerClickHandler}>
                  <b>팔로워</b>
                  <span>{currentUser.followers || 0}</span>
                </li>
                <li className="followings" onClick={followingClickHandler}>
                  <b>팔로잉</b>
                  <span>{currentUser.followings || 0}</span>
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
      <Modal
        visible={toggle.activeToggle === 'FollowersList'}
        title="팔로워"
        onCancel={() => onToggle('FollowersList')}
      >
        {FollowersList && (
          <FollowViewContainer
            type="follower"
            isMe={currentUser.isMe}
            list={FollowersList}
            event={onUnfollowFromList}
          />
        )}
      </Modal>
      <Modal
        visible={toggle.activeToggle === 'FollowingsList'}
        title="팔로잉"
        onCancel={() => onToggle('FollowingsList')}
      >
        {FollowingsList && (
          <FollowViewContainer
            type="following"
            isMe={currentUser.isMe}
            list={FollowingsList}
            event={onUnfollowFromList}
          />
        )}
      </Modal>
    </ProfileViewWrap>
  );
};

export default ProfileView;
