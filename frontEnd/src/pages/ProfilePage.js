import React from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import ProfileView from '../components/profile/ProfileView';
import ActivityView from '../components/profile/ActivityView';
import ProfileSettingContainer from '../containers/profile/ProfileSettingContainer';
import TabArea from '../components/profile/TabArea';

const ProfilePageHead = styled.div`
  margin-top: 2rem;
`;
const ProfilePageBody = styled.div`
  background: #fff;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 5px;
  display: flex;
  .left { 
    width: 140px;
    margin-right: 2rem;
  }
  .right {
    width: 100%;
  }
`;

const ProfilePage = () => {
  return (
    <Responsive maxWidth="1200">
      <ProfilePageHead>
        <ProfileView />
      </ProfilePageHead>
      <ProfilePageBody>
        <div className="left">
          <TabArea />
        </div>
        <div className="right">
          {/* <ActivityView /> */}
          <ProfileSettingContainer />
        </div>
      </ProfilePageBody>
    </Responsive>
  )
}

export default ProfilePage;