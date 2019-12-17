import React from 'react';
import FollowView from '../../components/profile/FollowView';
import LoadingWrap from '../../components/common/LoadingWrap';

const FollowViewContaienr = ({ type, isMe, list, event }) => {
  return (
    <LoadingWrap
      loadingType={
        type === 'following' ? 'user/READ_FOLLOWINGS' : 'user/READ_FOLLOWERS'
      }
      styleType="follow"
    >
      <FollowView
        type={type}
        isMe={isMe}
        list={list}
        event={event}
      />
    </LoadingWrap>
  )
};

export default FollowViewContaienr;