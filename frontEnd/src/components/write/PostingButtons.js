import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const PostingButtonsWrap = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button + button {
    margin-left: 0.5rem;
  }
`;

const PostingButtons = ({ onPosting, onCancel }) => (
  <PostingButtonsWrap>
    <Button
      onClick={onPosting}
      background="point"
      size="lg"
      placeholder="글쓰기"
    />
    <Button
      onClick={onCancel}
      size="lg"
      placeholder="취소"
    />
  </PostingButtonsWrap>
);

export default PostingButtons;
