import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

// Component...
import Button from '../common/Button';
import NoContents from '../common/NoContents';

const FollowViewWrap = styled.div`
  width: 450px;
  height: 400px;
  overflow-y: auto;

  & > ul {
    padding-right: 1rem;
    & > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid ${brandingColor.common[2]};

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }   
    }
  }
`;

const Portrait = styled.div`
  margin-right: 2rem;
  text-align: center;

  &::before {
    content: '';
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${(props) => props.background ? `url(${props.background})` : '#ddd'};
    background-size: cover;
    background-position: center;
    margin-bottom: 0.5rem;
  }

  & > span {
    font-size: 13px;
    font-weight: bold;
    color: ${brandingColor.common[6]};
  }
`;

const Introduce = styled.div`
  width: 75%;

  & > .title {  
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${brandingColor.common[8]};
  }

  & > .favorite {
    font-size: 12px;
    color: ${brandingColor.common[6]};
  }
`;

const Buttons = styled.div``;

const FollowView = ({ type, isMe, list, event }) => {
  return (
    <FollowViewWrap>
      <ul>
        {list.length > 0 ? list.map((follower) => {
          return (
            <li>
              <Portrait background={follower.portrait ? `${follower.portrait}` : null}>
                <span>{follower.nickname}</span>
              </Portrait>
              <Introduce>
                <div className="title">
                  {follower.title ? follower.title : '내용이 없습니다.'}
                </div>
                <div className="favorite">
                  {follower.favorite ? follower.favorite : '내용이 없습니다.'}
                </div>
              </Introduce>
              {isMe ? (
                <Buttons>
                  {type === 'follower' ? (
                    <Button
                      placeholder="언팔로잉"
                      size="md"
                      background="main"
                      onClick={() => event('unfollowing', follower.id)}
                    />
                  ) : (
                    <Button
                      placeholder="언팔로우"
                      size="md"
                      background="main"
                      onClick={() => event('unfollow', follower.id)}
                    />
                  )}
                </Buttons>
              ) : (null)}
            </li>
          );
        }) : (
          <NoContents placeholder={type === 'follower' ? '팔로워가 존재하지 않습니다.' : '팔로잉한 유저가 존재하지 않습니다.'} />
        )}
      </ul>
    </FollowViewWrap>
  );
};

export default FollowView;
