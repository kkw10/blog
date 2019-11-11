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

const PostView = () => (
  <PostViewWrap>
    <Head>
      <HeadInfo>
        <ul className="tags">
          <li>태그1</li>
          <li>태그2</li>
          <li>태그3</li>
        </ul>
        <div className="auther">
          <b>작성자</b>
          <span>
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </HeadInfo>
      <h2>제목</h2>
    </Head>
    <Contents dangerouslySetInnerHTML={{ __html: '<p>더미 컨텐츠입니다.</p>' }} />
  </PostViewWrap>
);

export default PostView;
