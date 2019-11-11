import React from 'react';
import PostViewContainer from '../containers/post/postViewContainer';
import Responsive from '../components/common/Responsive';

const PostPage = () => (
  <Responsive maxWidth="1200">
    <PostViewContainer />
  </Responsive>
);

export default PostPage;
