import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const PostViewWrap = styled.div`
  margin-top: 2rem;
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
`;

const Head = styled.div`
  margin-bottom: 2rem;

  h2 {
    margin-top: 0.5rem;
    font-size: 18px;
  }
`;

const HeadInfo = styled.div`
  overflow: hidden;

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
        <HeadInfo>
          <ul className="tags">
            {postData.HashTags.map((hashTag) => (
              <li className="tag" key="tag">{hashTag.name}</li>
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
      </Head>
      <Contents
        className="tui-style tui-editor-contents"
        dangerouslySetInnerHTML={{ __html: postData.contents }}
      />
    </PostViewWrap>
  );
};

export default PostView;
