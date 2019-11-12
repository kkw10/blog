import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostsView from '../../components/posts/postsView';
import { readPosts } from '../../models/actions/posts';

const PostsViewContainer = () => {
  const dispatch = useDispatch();
  const { postsData, postsError } = useSelector(({ posts }) => ({
    postsData: posts.result,
    postsError: posts.postsError,
  }));

  useEffect(() => {
    dispatch(readPosts());
    console.log(postsData);
  }, [dispatch]);

  return (
    <PostsView
      postsData={postsData}
      potsError={postsError}
    />
  );
};

export default PostsViewContainer;
