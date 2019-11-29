import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileView from '../../components/profile/ProfileView';

const ProfileViewContainer = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(({ user }) => ({
    user: user.user,
    profile: user.profile,
  }));

  return (
    <ProfileView
      user={user}
      profile={profile}
    />
  );
};

export default ProfileViewContainer;
