import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ErrorContainer = ({ history }) => {
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
    if (userError || postsError || postError || writeError) {
      history.push('/error');
    }
  }, [userError, postsError, postError, writeError]);

  return (
    <></>
  );
};

export default withRouter(ErrorContainer);
