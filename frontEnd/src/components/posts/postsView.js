import React, { useEffect } from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const PostsViewWrap = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 5px;
  padding: 1rem;

  .left {

  }

  .right {

  }
`;

const PostBoxWrap = styled.div`
  padding: 1rem;
  overflow: hidden;
  border-bottom: 1px solid ${brandingColor.common[2]};

  h3 {
    color: ${brandingColor.point[5]};
    font-size: 16px;
  }

  .tags {
    display: flex;
    margin-top: 0.5rem;
    font-size: 13px;

    li {
      margin-right: 0.5rem;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .date {
    b::after {
      content: '/';
      display: inline-block;
      margin: 0 5px;
      font-size: 13px;
      font-weight: normal;
    }

    float: right;
    font-size: 13px;
    color: ${brandingColor.common[6]};
  }
`;

const PostBox = ({ postData }) => {
  return (
    <PostBoxWrap>
      <h3>
        {postData.title}
      </h3>
      <ul className="tags">
        {postData.HashTags.map((tag) => (
          <li>{tag.name}</li>
        ))}
      </ul>
      <div className="date">
        <b>{postData.User.nickname}</b>
        {new Date(postData.updatedAt).toLocaleDateString()}
      </div>
    </PostBoxWrap>
  )
};

const PostsView = ({
  postsData,
  postsError,
}) => {
  return (
    <PostsViewWrap>
      {postsData && postsData.map((postData) => (
        <PostBox postData={postData} />
      ))}
    </PostsViewWrap>
  )
}

export default PostsView;