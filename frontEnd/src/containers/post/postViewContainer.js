import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostView from '../../components/post/PostView';
import { readPost } from '../../models/actions/post';

const PostViewContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { postData, postError, loading, user } = useSelector(({ post, loading, user }) => ({
    postData: post.result,
    postError: post.postError,
    loading: loading['post/READ_POST'],
    user: user.user,
  }));
  const postId = match.params.PostId;

  useEffect(() => {
    dispatch(readPost(postId));
  }, [dispatch, postId]);

  return (
    <PostView
      postData={postData}
      loading={loading}
      postError={postError}
      user={user}
    />
  );
};

export default withRouter(PostViewContainer);
