import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Component...
import Comment from '../../components/common/Comment';

const CommentContainer = () => {
  const dispatch = useDispatch();

  return (
    <Comment/>
  )
};

export default CommentContainer;
