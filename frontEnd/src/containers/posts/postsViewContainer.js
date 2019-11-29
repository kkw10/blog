import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PostsView from '../../components/posts/postsView';
import { readPosts } from '../../models/actions/posts';
import { getTargetProfile } from '../../models/actions/user';

const PostsViewContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { postsData, postsError, lastPage } = useSelector(({ posts }) => ({
    postsData: posts.result,
    postsError: posts.postsError,
    lastPage: posts.lastPage,
  }));

  const onGetTargetProfile = useCallback((targetId) => {
    dispatch(getTargetProfile(targetId));
  }, [dispatch]);

  useEffect(() => {
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(readPosts(page));
  }, [dispatch, location.search]);

  return (
    <PostsView
      postsData={postsData}
      potsError={postsError}
      lastPage={lastPage}
      onGetTargetProfile={onGetTargetProfile}
    />
  );
};

export default withRouter(PostsViewContainer);
