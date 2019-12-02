import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTargetProfile } from '../../models/actions/user';
import ProfileView from '../../components/profile/ProfileView';

const ProfileViewContainer = ({ match }) => {
  const dispatch = useDispatch();
  const targetId = match.params.UserId;
  const { user, profile, stranger } = useSelector(({ user }) => ({
    user: user.user,
    profile: user.profile,
    stranger: user.stranger,
  }));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => { // 타겟 유저 정보 가져오기
    dispatch(getTargetProfile(targetId));
  }, [targetId]);

  useEffect(() => { // 타켓 유저가 나인지 다른 유저인지 정의
    if (!user) return;

    if (stranger && user.id === stranger.id) {
      console.log('OK')
      setCurrentUser({
        ...user,
        ...profile,
        isMe: true,
      });

      return;
    }

    setCurrentUser(stranger);
  }, [user, stranger, profile]);

  return (
    <ProfileView currentUser={currentUser} />
  );
};

export default withRouter(ProfileViewContainer);
