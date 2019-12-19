import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTargetProfile,
  readFollowList,
  unfollowFromList,
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

  const onReadFollowList = useCallback((type, targetId) => {
    dispatch(readFollowList({ type, targetId }));
  }, [dispatch]);

  const onUnfollowFromList = useCallback((type, targetId) => {
    dispatch(unfollowFromList({ type, targetId }));
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
    };
  }, []);

  return (
    <ProfileView
      currentUser={currentUser}
      FollowersList={FollowersList}
      FollowingsList={FollowingsList}
      onReadFollowList={onReadFollowList}
      onUnfollowFromList={onUnfollowFromList}
    />
  );
};

export default withRouter(ProfileViewContainer);
