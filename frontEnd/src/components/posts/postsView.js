import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';
import Tag from '../common/Tag';
import PageNum from './PageNum';

const PostsViewWrap = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
  display: flex;

  .left {
    display: flex;
    justify-content: center;
  }

  .right {
    width: 100%;
  }
`;

const PostBoxWrap = styled.div`
  padding: 1rem;
  padding-left: 0;
  overflow: hidden;
  border-bottom: 1px solid ${brandingColor.common[2]};
  display: flex;
  align-items: center;

  .left ul {
    display: flex;
    margin-right: 1rem;
    font-size: 12px;
    color: ${brandingColor.common[5]};

    li {
      width: 50px;
      text-align: center;
      padding: 0.3rem;
      border: 1px solid ${brandingColor.common[3]};
      border-radius: 5px;
      font-weight: bold;
      margin-right: 0.5rem;
      &:last-child {
        margin-right: 0;
      }
      &.fill {
        border-color: ${brandingColor.green[5]}
      }
      .numb {
        margin-bottom: 0.5rem;
      }
    }
  }

  h3 {
    color: ${brandingColor.point[5]};
    font-size: 16px;
  }

  .tags {
    display: flex;
    margin-top: 1rem;

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
      <div className="left">
        <ul>
          <li>
            <div className="numb">{postData.Recomenders.length}</div>
            <div>좋아요</div>
          </li>
          <li className={postData.Comments.length > 0 ? 'fill' : null}>
            <div className="numb">{postData.Comments.length}</div>
            <div>댓글</div>
          </li>
        </ul>
      </div>
      <div className="right">
        <h3>
          <Link to={`/post/${postData.UserId}/${postData.id}`}>{postData.title}</Link>
        </h3>
        <ul className="tags">
          {postData.HashTags.map((tag) => (
            <li key={tag.name}>
              <Tag name={tag.name} />
            </li>
          ))}
        </ul>
        <div className="date">
          <b>{postData.User.nickname}</b>
          {new Date(postData.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </PostBoxWrap>
  );
};

const PostsView = ({
  postsData,
  postsError,
  lastPage,
}) => {
  if (postsError) {
    return null;
  }

  return (
    <PostsViewWrap>
      <div className="left">
        <PageNum
          lastPage={lastPage}
        />
      </div>
      <ul className="right">
        {postsData && postsData.map((postData) => (
          <li key={postData.id}>
            <PostBox
              postData={postData}
            />
          </li>
        ))}
      </ul>
    </PostsViewWrap>
  );
};

export default PostsView;
