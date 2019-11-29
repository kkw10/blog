import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../components/common/UserCard';

const UserCardContainer = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(({ user }) => ({
    user: user.user,
    profile: user.profile,
  }));

  return (
    <UserCard
      user={user}
      profile={profile}
    />
  )
};

export default UserCardContainer;