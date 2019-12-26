import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Error from '../../components/common/Error';

const ErrorContainer = () => {
  const [currentError, setCurrentError] = useState(null);
  const {
    userError,
    userCheckError,
    postsError,
    postError,
    writeError,
  } = useSelector(({ user, posts, post, write }) => ({
    userError: user.error,
    userCheckError: user.error_check,
    postsError: posts.error,
    postError: post.error,
    writeError: write.error,
  }));

  useEffect(() => {
    // 로그인 체크 에러는 에러페이지로 이동 x;
    if (userCheckError) return;

    if (userError) {
      setCurrentError(userError);
    } else if (postsError) {
      setCurrentError(postsError);
    } else if (postError) {
      setCurrentError(postError);
    } else {
      setCurrentError(writeError);
    }
  }, [userError, userCheckError, postsError, postError, writeError]);

  return (
    <Error
      currentError={currentError}
    />
  );
};

export default ErrorContainer;
