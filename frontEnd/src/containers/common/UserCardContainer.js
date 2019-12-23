import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../../components/common/UserCard';
import {
  resetStrangerProfile,
  follow,
} from '../../models/actions/user';

const UserCardContainer = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const { user, profile, stranger } = useSelector(({ user }) => ({
    user: user.user,
    profile: user.profile,
    stranger: user.stranger,
  }));

  const onResetStranger = useCallback(() => {
    dispatch(resetStrangerProfile());
  }, [dispatch]);

  const onFollow = useCallback((type, targetId) => {
    dispatch(follow({ type, targetId }));
  }, [dispatch]);

  useEffect(() => { // 유저카드 대상이 나인지 다른 유저인지 판단.
    if ((stranger && user) && (user.id === stranger.id)) {
      dispatch(resetStrangerProfile());
      return;
    }
    if (stranger) {
      setCurrentUser(stranger);
      return;
    }
    if (user) {
      setCurrentUser({
        ...user,
        ...profile,
        isMe: true,
      });
    }
  }, [stranger, user, profile]);

  return (
    <UserCard
      me={user}
      currentUser={currentUser}
      onResetStranger={onResetStranger}
      onFollow={onFollow}
    />
  );
};

export default UserCardContainer;
