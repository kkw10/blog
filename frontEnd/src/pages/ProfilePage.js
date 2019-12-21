import React from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import ProfileViewContainer from '../containers/profile/ProfileViewContainer';
import ProfileBody from '../components/profile/ProfileBody';

const ProfilePageHead = styled.div`
  margin-top: 2rem;
`;

const ProfilePage = () => {
  return (
    <Responsive maxWidth="1200">
      <ProfilePageHead>
        <ProfileViewContainer />
      </ProfilePageHead>
      <div>
        <ProfileBody />
      </div>
    </Responsive>
  );
};

export default ProfilePage;
