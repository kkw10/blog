import React from 'react';
import PostView from '../components/post/PostView';
import Responsive from '../components/common/Responsive';

const PostPage = () => (
  <Responsive maxWidth="1200">
    <PostView />
  </Responsive>
);

export default PostPage;
