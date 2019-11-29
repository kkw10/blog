import React from 'react';
import styled from 'styled-components';
import PostsViewContainer from '../containers/posts/postsViewContainer';
import Responsive from '../components/common/Responsive';
import UserCardContainer from '../containers/common/UserCardContainer';

const PostPageLayout = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .posts_area {
    width: calc(100% - 350px);
    margin-right: 2rem;
  }
  .card_area {
    width: 350px;
  }
`;

const PostPage = () => {
  return (
    <Responsive maxWidth="1400">
      <PostPageLayout>
        <div className="posts_area">
          <PostsViewContainer />
        </div>
        <div className="card_area">
          <UserCardContainer />
        </div>
      </PostPageLayout>
    </Responsive>
  )
}

export default PostPage;