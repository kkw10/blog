import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import TabArea from './TabArea';
import ActivityView from './ActivityView';
import ProfileSettingContainer from '../../containers/profile/ProfileSettingContainer';

const ProfileBodyWrap = styled.div`
  background: #fff;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 5px;
  display: flex;
  & > .tab-area { 
    width: 140px;
    margin-right: 2rem;
  }
  & > .contents-area {
    width: 100%;
  }
`;

const ProfileBody = () => {
  const [selectedMenu, setSelectedMenu] = useState('activity');

  const onChangeMenu = useCallback((menu) => {
    setSelectedMenu(menu)
  }, []);

  const rendering = () => {
    if (selectedMenu === 'activity') {
      return <ActivityView />;
    }
    return <ProfileSettingContainer onChangeMenu={onChangeMenu} />;
  };

  return (
    <ProfileBodyWrap>
      <div className="tab-area">
        <TabArea
          selectedMenu={selectedMenu}
          onChangeMenu={onChangeMenu}
        />
      </div>
      <div className="contents-area">
        {rendering()}
      </div>
    </ProfileBodyWrap>
  );
};

export default ProfileBody;
