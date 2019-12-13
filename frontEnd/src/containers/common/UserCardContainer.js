import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../../components/common/UserCard';
import {
  resetStrangerProfile,
  follow,
  unfollow,
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

  const onFollow = useCallback((targetId) => {
    dispatch(follow(targetId));
  }, [dispatch]);

  const onUnfollow = useCallback((targetId) => {
    dispatch(unfollow(targetId));
  }, [dispatch]);

  useEffect(() => { // 유저카드 대상이 나인지 다른 유저인지 판단.
    if (!user) return;
    if (stranger && user.id === stranger.id) {
      dispatch(resetStrangerProfile());
      return;
    }

    if (stranger) {
      setCurrentUser(stranger);
      return;
    }

    setCurrentUser({
      ...user,
      ...profile,
      isMe: true,
    });
  }, [stranger, user, profile]);

  return (
    <UserCard
      currentUser={currentUser}
      onResetStranger={onResetStranger}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
    />
  )
};

export default UserCardContainer;