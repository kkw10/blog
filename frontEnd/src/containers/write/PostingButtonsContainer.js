import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { posting, update } from '../../models/actions/write';
import PostingButtons from '../../components/write/PostingButtons';

const PostingButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    title,
    contents,
    hashTags,
    result,
    postingError,
    editingPostId,
  } = useSelector(({ write }) => ({
    title: write.title,
    contents: write.contents,
    hashTags: write.hashTags,
    result: write.result,
    postingError: write.postingError,
    editingPostId: write.editingPostId,
  }));

  const onPosting = () => {
    if (editingPostId) {
      dispatch(update({
        id: editingPostId,
        title,
        contents,
        hashTags,
      }));

      return;
    }

    dispatch(posting({
      title,
      contents,
      hashTags,
    }));
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (result) {
      history.push(`/post/${result.UserId}/${result.id}`);
    }

    if (postingError) {
      console.log(postingError);
    }
  }, [history, result, postingError]);

  return (
    <PostingButtons
      onPosting={onPosting}
      onCancel={onCancel}
      isEditing={!!editingPostId}
    />
  );
};

export default withRouter(PostingButtonsContainer);
