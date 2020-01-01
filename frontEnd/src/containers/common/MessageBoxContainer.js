import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../components/common/MessageBox';
import { clearLoading } from '../../models/actions/loading';

const MessageBoxContainer = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const loading = useSelector(({ loading }) => loading);

  const targetAction = [ // 알림 메시지 띄울 액션 및 알림 메시지 지정
    {
      type: 'user/UPLOAD_PROFILE',
      message: '프로필 설정이 완료되었습니다.',
    },
    {
      type: 'user/UNFOLLOW_FROM_LIST',
      message: '언팔로우가 완료되었습니다.',
    },
    {
      type: 'user/UNFOLLOWING_FROM_LIST',
      message: '언팔로잉이 완료되었습니다.',
    },
  ];

  // 현재 로딩 목록에 있는 상태들 중 알림 메시지 타겟으로 지정된 것이 있는지 체크
  const findAction = useCallback(() => {
    const idx = targetAction.findIndex((v) => (loading[v.type] === true));
    if (idx >= 0) return targetAction[idx].message;
  }, [loading]);

  // 타켓이 있다면 visible state true;
  useEffect(() => {
    const message = findAction();
    if (message) {
      setVisible(true);
      setMessage(message);

      setTimeout(() => {
        setVisible(false);
      }, 3500);

      dispatch(clearLoading());
    }
  }, [loading]);

  return (
    <MessageBox
      visible={visible}
      message={message}
    />
  );
};

export default MessageBoxContainer;
