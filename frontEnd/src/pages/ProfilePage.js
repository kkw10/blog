import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import ProfileViewContainer from '../containers/profile/ProfileViewContainer';
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
  const [currentMenu, setCurrentMenu] = useState('activity');

  const onChangeMenu = (menu) => {
    setCurrentMenu(menu);
  };

  const selectMenu = () => {
    if (currentMenu === 'activity') {
      return <ActivityView />;
    }

    return <ProfileSettingContainer onChangeMenu={onChangeMenu} />;
  };

  return (
    <Responsive maxWidth="1200">
      <ProfilePageHead>
        <ProfileViewContainer />
      </ProfilePageHead>
      <ProfilePageBody>
        <div className="left">
          <TabArea
            currentMenu={currentMenu}
            onChangeMenu={onChangeMenu}
          />
        </div>
        <div className="right">
          {selectMenu()}
        </div>
      </ProfilePageBody>
    </Responsive>
  )
}

export default ProfilePage;