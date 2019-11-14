import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PostsView from '../../components/posts/postsView';
import { readPosts } from '../../models/actions/posts';

const PostsViewContainer = ({ location }) => {
  const dispatch = useDispatch();
  const { postsData, postsError, lastPage } = useSelector(({ posts }) => ({
    postsData: posts.result,
    postsError: posts.postsError,
    lastPage: posts.lastPage,
  }));

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
    />
  );
};

export default withRouter(PostsViewContainer);
