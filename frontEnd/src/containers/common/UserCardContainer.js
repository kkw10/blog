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
  const [isFollowing, setIsFollowing] = useState(false);
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

  useEffect(() => { // 선택한 유저가 이미 팔로우한 유저인지 판단.
    if (!profile) return;

    if (!profile.Followings || !stranger) return;

    const followingUser = profile.Followings.filter((following) => following.id === stranger.id)[0];

    if (followingUser) {
      setIsFollowing(true);
      return;
    }

    setIsFollowing(false);
  }, [profile, stranger]);

  return (
    <UserCard
      currentUser={currentUser}
      isFollowing={isFollowing}
      onResetStranger={onResetStranger}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
    />
  )
};

export default UserCardContainer;