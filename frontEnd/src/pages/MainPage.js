import React from 'react';
import PostsViewContainer from '../containers/posts/postsViewContainer';
import Responsive from '../components/common/Responsive';

const PostPage = () => {
  return (
    <Responsive maxWidth="1200">
      <PostsViewContainer />
    </Responsive>
  )
}

export default PostPage;