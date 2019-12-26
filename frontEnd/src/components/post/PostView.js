import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FaUserAstronaut } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';
import useToggle from '../../lib/hooks/toggleHook';

// Component...
import PostCommentsContainer from '../../containers/post/PostCommentsContainer';
import Button from '../common/Button';
import Tag from '../common/Tag';
import AlertModal from '../common/modal/AlertModal';
import InfoModal from '../common/modal/InfoModal';

const PostViewWrap = styled.div`
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
    margin-bottom: 1rem;

    li {
      cursor: pointer;
      margin-right: 0.5rem;
    }
    
    li:last-child {
      margin-right: 0;
    }
  }

  .auther {
    display: flex;
    align-items: center;
    & > .auther_portrait {
      margin-right: 0.5rem;
      img {
        border-radius: 5px;
        width: 30px;
        height: 30px;
      }

      .default_user {
        font-size: 16px;
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        background: ${brandingColor.common[4]};
        display: flex;
        align-items: center;
        justify-content: center;
      }      
    }

    & > .auther_name {
      font-size: 13px;
      color: ${brandingColor.common[6]};
      b {
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          color: ${brandingColor.main[6]};
        }
      }
      b::after {
        content: '/';
        display: inline-block;
        margin: 0 5px;
        font-weight: normal;
      }
    }
  }
`;

const IconButton = styled.button`
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

const Contents = styled.div``;

const PostView = ({
  postResult,
  postError,
  loading,
  user,
  onEdit,
  onDelete,
  onRecomend,
  onGetTargetProfile,
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
  const [toggle, onToggle] = useToggle();

  return (
    <>
      <PostViewWrap>
        <Head>
          <div className="left">
            <HeadInfo>
              <ul className="tags">
                {postResult.HashTags.map((hashTag) => (
                  <li className="tag" key="tag">
                    <Link to={`/posts/tagged/${hashTag.name}`}>
                      <Tag name={hashTag.name} />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="auther">
                <div className="auther_portrait">
                  {postResult.User.portrait ? (
                    // <img src={`http://localhost:1991/uploads/${postResult.User.portrait}`} alt="" />
                    <img src={`${postResult.User.portrait}`} alt="" />
                  ) : (
                    <div className="default_user">
                      <FaUserAstronaut />
                    </div>
                  )}
                </div>
                <div className="auther_name">
                  <b onClick={() => onGetTargetProfile(postResult.UserId)}>
                    {postResult.User.nickname}
                  </b>
                  <span>
                    {new Date(postResult.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </HeadInfo>
            <h2>{postResult.title}</h2>
          </div>
          <div className="right">
            <div className="flexBox">
              <div className="buttons">
                <IconButton>
                  <MdRemoveRedEye />
                  <span>{postResult.views}</span>
                </IconButton>
                <IconButton
                  onClick={user ? onRecomend : () => onToggle('info')}
                  fill={isRecomended ? 'true' : 'false'}
                >
                  {isRecomended ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )}
                  <span>{postResult.Recomenders && (postResult.Recomenders.length) || 0}</span>
                </IconButton>
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
                      onClick={() => onToggle('alert')}
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
        <PostCommentsContainer />
      </PostViewWrap>
      <AlertModal
        title="경고!"
        description="정말로 삭제를 하시겠습니까?"
        visible={toggle && toggle.activeToggle === 'alert'}
        onCancel={() => onToggle('alert')}
        onSubmit={onDelete}
      />
      <InfoModal
        title="알림"
        description="로그인이 필요한 기능입니다."
        visible={toggle && toggle.activeToggle === 'info'}
        onCancel={() => onToggle('info')}
      />
    </>
  );
};

export default PostView;
