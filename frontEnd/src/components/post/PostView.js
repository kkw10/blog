import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';
import Tag from '../common/Tag';
import Button from '../common/Button';

const PostViewWrap = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  .right {
    button + button {
      margin-left: 0.5rem;
    }
  }

  h2 {
    margin-top: 1rem;
    font-size: 18px;
    color: ${brandingColor.point[5]};
  }
`;

const HeadInfo = styled.div`
  .tags {
    display: flex;
    margin-bottom: 0.5rem;

    li {
      cursor: pointer;
      margin-right: 0.5rem;
    }
    
    li:last-child {
      margin-right: 0;
    }
  }

  .auther {
    margin-bottom: 0.5rem;
    font-size: 13px;
    color: ${brandingColor.common[6]};

    b::after {
      content: '/';
      display: inline-block;
      margin: 0 5px;
      font-size: 13px;
      font-weight: normal;
    }
  }
`;

const Contents = styled.div`

`;

const PostView = ({
  postData,
  postError,
  loading,
  user,
}) => {
  if (loading || !postData) {
    return null;
  }

  if (postError) {
    return (
      <PostViewWrap>
        {postError}
      </PostViewWrap>
    );
  }

  return (
    <PostViewWrap>
      <Head>
        <div className="left">
          <HeadInfo>
            <ul className="tags">
              {postData.HashTags.map((hashTag) => (
                <li className="tag" key="tag">
                  <Tag name={hashTag.name} />
                </li>
              ))}
            </ul>
            <div className="auther">
              <b>{postData.User.nickname}</b>
              <span>
                {new Date(postData.createdAt).toLocaleDateString()}
              </span>
            </div>
          </HeadInfo>
          <h2>{postData.title}</h2>
        </div>
        <div className="right">
          {user && postData.UserId === user.id ? (
            <>
              <Button
                placeholder="수정"
                size="md"
              />
              <Button
                placeholder="삭제"
                size="md"
                background="point"
              />
            </>
          ) : null}
        </div>
      </Head>
      <Contents
        className="tui-style tui-editor-contents"
        dangerouslySetInnerHTML={{ __html: postData.contents }}
      />
    </PostViewWrap>
  );
};

export default PostView;
