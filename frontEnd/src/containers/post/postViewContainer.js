import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostView from '../../components/post/PostView';
import { readPost } from '../../models/actions/post';
import { setOriginalPost, changeField } from '../../models/actions/write';
import { toggling } from '../../models/actions/toggle';
import { remove } from '../../lib/api/post';

const PostViewContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const {
    postData,
    postError,
    loading,
    user,
  } = useSelector(({ post, loading, user }) => ({
    postData: post.result,
    postError: post.postError,
    loading: loading['post/READ_POST'],
    user: user.user,
  }));
  const toggle = useSelector(({ toggle }) => toggle);
  const postId = match.params.PostId;

  const onEdit = () => {
    const post = {
      postId: postData.id,
      title: postData.title,
      contents: postData.contents,
      hashTags: [...postData.HashTags].map((v) => v.name),
    };

    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onDelete = async () => {
    try {
      await remove(postId);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeField = useCallback((payload) => {
    console.log(payload);
    dispatch(changeField(payload));
  }, [dispatch]);

  const onToggling = (type) => {
    dispatch(toggling(type));
  };

  useEffect(() => {
    dispatch(readPost(postId));
  }, [dispatch, postId]);

  return (
    <PostView
      user={user}
      postData={postData}
      postError={postError}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
      toggle={toggle}
      onToggling={onToggling}
      onChangeField={onChangeField}
    />
  );
};

export default withRouter(PostViewContainer);
