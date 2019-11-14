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

const PostingButtons = ({
  onPosting,
  onCancel,
  isEditing,
}) => (
  <PostingButtonsWrap>
    <Button
      onClick={onPosting}
      background="point"
      size="lg"
      placeholder={isEditing ? '수정하기' : '글쓰기'}
    />
    <Button
      onClick={onCancel}
      size="lg"
      placeholder="취소"
    />
  </PostingButtonsWrap>
);

export default PostingButtons;
