import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { posting } from '../../models/actions/write';
import PostingButtons from '../../components/write/PostingButtons';

const PostingButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    title,
    contents,
    hashTags,
    result,
    postingError,
  } = useSelector(({ write }) => ({
    title: write.title,
    contents: write.contents,
    hashTags: write.hashTags,
    result: write.result,
    postingError: write.postingError,
  }));

  const onPosting = () => {
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
      console.log('@@@@@ 다음은 포스팅 요청 결과입니다.');
      console.log(result);
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
    />
  );
};

export default withRouter(PostingButtonsContainer);
