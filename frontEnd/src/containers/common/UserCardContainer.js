import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../../components/common/UserCard';

const UserCardContainer = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user, profile, stranger } = useSelector(({ user }) => ({
    user: user.user,
    profile: user.profile,
    stranger: user.stranger,
  }));

  useEffect(() => {
    if (!user) return;

    if (stranger) {
      setCurrentUser(stranger);
      return;
    }

    setCurrentUser({
      nickname: user.nickname,
      ...profile,
    });
  }, [stranger, user, profile]);

  return (
    <UserCard
      user={currentUser}
    />
  )
};

export default UserCardContainer;