import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTargetProfile,
  readFollowers,
  readFollowings,
  unfollowFromList,
  unfollowingFromList,
  clearFollowList,
} from '../../models/actions/user';

// Component...
import ProfileView from '../../components/profile/ProfileView';

const ProfileViewContainer = ({ match }) => {
  const dispatch = useDispatch();
  const pageId = match.params.UserId;
  const {
    user,
    profile,
    stranger,
    FollowersList,
    FollowingsList,
  } = useSelector(({ user }) => ({
    user: user.user,
    profile: user.profile,
    stranger: user.stranger,
    FollowersList: user.FollowersList,
    FollowingsList: user.FollowingsList,
  }));
  const [currentUser, setCurrentUser] = useState(null);

  const onReadFollowers = useCallback((targetId) => {
    dispatch(readFollowers(targetId));
  }, [dispatch]);

  const onReadFollowings = useCallback((targetId) => {
    dispatch(readFollowings(targetId));
  }, [dispatch]);

  const onUnfollowFromList = useCallback((targetId) => {
    dispatch(unfollowFromList(targetId));
  }, [dispatch]);

  const onUnfollowingFromList = useCallback((targetId) => {
    dispatch(unfollowingFromList(targetId));
  }, [dispatch]);

  useEffect(() => { // 타겟 유저 정보 가져오기
    dispatch(getTargetProfile(pageId));
  }, [pageId]);

  useEffect(() => { // 타켓 유저가 나인지 다른 유저인지 정의
    if (!user) return;

    if (user.id === Number(pageId)) {
      setCurrentUser({
        ...user,
        ...profile,
        isMe: true,
      });
      return;
    }

    setCurrentUser(stranger);
  }, [user, stranger, profile, pageId]);

  useEffect(() => { // 언마운트될 때 팔로워, 팔로잉 리스트 초기화
    return () => {
      dispatch(clearFollowList());
    }
  }, []);

  return (
    <ProfileView
      currentUser={currentUser}
      FollowersList={FollowersList}
      FollowingsList={FollowingsList}
      onReadFollowers={onReadFollowers}
      onReadFollowings={onReadFollowings}
      onUnfollowFromList={onUnfollowFromList}
      onUnfollowingFromList={onUnfollowingFromList}
    />
  );
};

export default withRouter(ProfileViewContainer);
