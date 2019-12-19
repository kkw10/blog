import React from 'react';
import FollowView from '../../components/profile/FollowView';
import LoadingWrap from '../../components/common/LoadingWrap';
import { brandingColor } from '../../lib/styles/branding';

const FollowViewContaienr = ({ type, isMe, list, event }) => {
  return (
    <LoadingWrap
      loadingType="user/READ_FOLLOW_LIST"
      styleType="follow"
      size={30}
      color={brandingColor.point[6]}
    >
      <FollowView
        type={type}
        isMe={isMe}
        list={list}
        event={event}
      />
    </LoadingWrap>
  );
};

export default FollowViewContaienr;
