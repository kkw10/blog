import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';
import Tag from '../common/Tag';
import Button from '../common/Button';
import AlertModal from '../common/modal/AlertModal';
import PostComments from './PostComments';

const PostViewWrap = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  overflow: hidden;

  .post-comments-wrap {
    height: 100%;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  .right {
    .flexBox {
      display: flex;
      align-items: center;      

      .tools {
        svg {
          cursor: pointer;
          font-size: 20px;
          margin-right: 1rem;
          color: ${brandingColor.point[6]};
        }       
      }
      .buttons {
        display: flex;
        button + button {
          margin-left: 0.5rem;
        }     
      }      
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

const VoteButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 28px;
  padding: 0 0.7rem;
  border: 1px solid ${brandingColor.point[6]};
  border-radius: 5px;
  color: ${(props) => (
    props.fill === 'true'
      ? brandingColor.main[5]
      : brandingColor.common[5]
  )};

  span {
    font-size: 13px;
    margin-left: 0.3rem;
    color: ${brandingColor.common[5]};
  }
`;

const Contents = styled.div`

`;

const PostView = ({
  postResult,
  commentsResult,
  postError,
  commentError,
  loading,
  user,
  onEdit,
  onDelete,
  onSubmit,
  toggle,
  onToggling,
  onChangeField,
  clearedForm,
  onRecomend,
  onThumbsUp,
  onThumbsDown,
  onRefresh,
}) => {
  if (loading || !postResult) {
    return null;
  }

  if (postError) {
    return (
      <PostViewWrap>
        {postError}
      </PostViewWrap>
    );
  }

  const isRecomended = user
    && postResult.Recomenders
    && postResult.Recomenders.find((v) => v.id === user.id);

  return (
    <>
      <PostViewWrap>
        <Head>
          <div className="left">
            <HeadInfo>
              <ul className="tags">
                {postResult.HashTags.map((hashTag) => (
                  <li className="tag" key="tag">
                    <Tag name={hashTag.name} />
                  </li>
                ))}
              </ul>
              <div className="auther">
                <b>{postResult.User.nickname}</b>
                <span>
                  {new Date(postResult.createdAt).toLocaleDateString()}
                </span>
              </div>
            </HeadInfo>
            <h2>{postResult.title}</h2>
          </div>
          <div className="right">
            <div className="flexBox">
              <div className="buttons">
                <VoteButton
                  onClick={onRecomend}
                  fill={isRecomended ? 'true' : 'false'}
                >
                  {isRecomended ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )}
                  <span>{postResult.Recomenders && (postResult.Recomenders.length) || 0}</span>
                </VoteButton>
                {user && postResult.UserId === user.id ? (
                  <>
                    <Button
                      placeholder="수정"
                      size="md"
                      onClick={onEdit}
                    />
                    <Button
                      placeholder="삭제"
                      size="md"
                      background="point"
                      onClick={() => onToggling('alert')}
                    />
                  </>
                ) : null}
              </div>

            </div>
          </div>
        </Head>
        <Contents
          className="tui-style tui-editor-contents"
          dangerouslySetInnerHTML={{ __html: postResult.contents }}
        />
        <PostComments
          user={user}
          commentsData={commentsResult}
          commentError={commentError}
          onChangeField={onChangeField}
          onSubmit={onSubmit}
          clearedForm={clearedForm}
          onThumbsUp={onThumbsUp}
          onThumbsDown={onThumbsDown}
          onRefresh={onRefresh}
        />
      </PostViewWrap>
      <AlertModal
        description="정말로 삭제를 하시겠습니까?"
        visible={toggle && toggle.activeToggle === 'alert'}
        onCancel={onToggling}
        onSubmit={onDelete}
      />
    </>
  );
};

export default PostView;
