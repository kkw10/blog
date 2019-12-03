import React from 'react';
import styled from 'styled-components';
import PostViewContainer from '../containers/post/postViewContainer';
import Responsive from '../components/common/Responsive';
import UserCardContainer from '../containers/common/UserCardContainer';

const PostPageLayout = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .posts_area {
    width: calc(100% - 382px);
    margin-right: 2rem;
  }
  .card_area {
    width: 350px;
    position: relative;
  }
`;

const FixedWrap = styled.div`
  position: fixed;
  width: 350px;
`;

const PostPage = () => (
  <Responsive maxWidth="1400">
    <PostPageLayout>
      <div className="posts_area">
        <PostViewContainer />
      </div>
      <div className="card_area">
        <FixedWrap>
          <UserCardContainer />
        </FixedWrap>
      </div>
    </PostPageLayout>
  </Responsive>
);

export default PostPage;
