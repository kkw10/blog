import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Error from '../../components/common/Error';

const ErrorContainer = () => {
  const [currentError, setCurrentError] = useState(null);
  const {
    userError,
    postsError,
    postError,
    writeError,
  } = useSelector(({ user, posts, post, write }) => ({
    userError: user.error,
    postsError: posts.error,
    postError: post.error,
    writeError: write.error,
  }));

  useEffect(() => {
    if (userError) {
      setCurrentError(userError);
    } else if (postsError) {
      setCurrentError(postsError);
    } else if (postError) {
      setCurrentError(postError);
    } else {
      setCurrentError(writeError);
    }
  }, [userError, postsError, postError, writeError])

  return (
    <Error
      currentError={currentError}
    />
  );
};

export default ErrorContainer;
