import React from 'react';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import PostsViewContainer from '../containers/posts/postsViewContainer';

const UserPostsPageLayout = styled.div`
  margin: 2rem 0;
`;

const UserPostsPage = () => (
  <Responsive maxWidth="1400">
    <UserPostsPageLayout>
      <PostsViewContainer />
    </UserPostsPageLayout>
  </Responsive>
);

export default UserPostsPage;
