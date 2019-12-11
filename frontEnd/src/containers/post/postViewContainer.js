import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostView from '../../components/post/PostView';
import {
  readPost,
  readComments,
  clearForm,
  recomend,
} from '../../models/actions/post';
import {
  initialize,
  setOriginalPost,
} from '../../models/actions/write';
import { getTargetProfile } from '../../models/actions/user';
import { toggling } from '../../models/actions/toggle';
import { remove } from '../../lib/api/post';

const PostViewContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const {
    postResult,
    commentsResult,
    postError,
    commentError,
    loading,
    user,
    clearedForm,
  } = useSelector(({ post, loading, user }) => ({
    postResult: post.postResult,
    commentsResult: post.commentsResult,
    postError: post.postError,
    commentError: post.commentError,
    loading: loading['post/READ_POST'],
    user: user.user,
    clearedForm: post.clearedForm,
  }));
  const toggle = useSelector(({ toggle }) => toggle);
  const {
    writeResult,
    editingCommentData,
  } = useSelector(({ write }) => ({
    writeResult: write.result,
    editingCommentData: {
      contents: write.comment,
      id: write.editingCommentId,
    },
  }));
  const postId = match.params.PostId;

  const onEdit = () => {
    const post = {
      postId: postResult.id,
      title: postResult.title,
      contents: postResult.contents,
      hashTags: [...postResult.HashTags].map((v) => v.name),
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

  const onToggling = useCallback((type) => {
    dispatch(toggling(type));
  }, [dispatch]);

  const onRecomend = useCallback(() => {
    dispatch(recomend(postId));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(readComments(postId));
  }, [dispatch]);

  const onGetTargetProfile = useCallback((profileId) => {
    dispatch(getTargetProfile(profileId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(readPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (postResult) {
      dispatch(getTargetProfile(postResult.UserId));
    }
  }, [postResult]);

  useEffect(() => {
    if (writeResult) {
      dispatch(readComments(postId));
      dispatch(initialize());
      dispatch(clearForm());
    }
  }, [dispatch, writeResult]);

  return (
    <PostView
      user={user}
      postResult={postResult}
      commentsResult={commentsResult}
      postError={postError}
      commentError={commentError}
      loading={loading}
      onEdit={onEdit}
      editingCommentData={editingCommentData}
      onDelete={onDelete}
      toggle={toggle}
      onToggling={onToggling}
      clearedForm={clearedForm}
      onRecomend={onRecomend}
      onGetTargetProfile={onGetTargetProfile}
      onRefresh={onRefresh}
    />
  );
};

export default withRouter(PostViewContainer);
