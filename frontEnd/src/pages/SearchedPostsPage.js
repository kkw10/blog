import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import PostsViewContainer from '../containers/posts/postsViewContainer';

const UserPostsPageLayout = styled.div`
  margin: 2rem 0;
`;

const UserPostsPage = () => (
  <Responsive maxWidth="1400">
    <Helmet>
      <title>포스트 리스트 - SPACER</title>
    </Helmet>
    <UserPostsPageLayout>
      <PostsViewContainer />
    </UserPostsPageLayout>
  </Responsive>
);

export default UserPostsPage;
