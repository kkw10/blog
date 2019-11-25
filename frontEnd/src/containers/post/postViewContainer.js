import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostView from '../../components/post/PostView';
import {
  readPost,
  readComments,
  clearForm,
  thumbsUp,
  thumbsDown,
  recomend,
  deleteComment,
} from '../../models/actions/post';
import {
  setOriginalPost,
  changeField,
  commenting,
  initialize,
} from '../../models/actions/write';
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
  const { commentContent, writeResult } = useSelector(({ write }) => ({
    commentContent: write.comment,
    writeResult: write.result,
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (!commentContent) return;

    const comment = {
      postId,
      contents: commentContent,
    };

    dispatch(commenting(comment));
    dispatch(clearForm());
  };

  const onChangeField = useCallback((payload) => {
    dispatch(changeField(payload));
  }, [dispatch]);

  const onToggling = (type) => {
    dispatch(toggling(type));
  };

  const onRecomend = useCallback(() => {
    dispatch(recomend(postId));
  }, [dispatch]);

  const onThumbsUp = useCallback((payload) => {
    dispatch(thumbsUp({
      postId,
      commentId: payload,
    }));
  }, [dispatch]);

  const onThumbsDown = useCallback((payload) => {
    dispatch(thumbsDown({
      postId,
      commentId: payload,
    }));
  }, [dispatch]);

  const onDeleteComment = useCallback((payload) => {
    dispatch(deleteComment({
      postId,
      commentId: payload,
    }));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(readComments(postId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(readPost(postId));
  }, [dispatch, postId]);

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
      onDelete={onDelete}
      onSubmit={onSubmit}
      toggle={toggle}
      onToggling={onToggling}
      onChangeField={onChangeField}
      clearedForm={clearedForm}
      onRecomend={onRecomend}
      onThumbsUp={onThumbsUp}
      onThumbsDown={onThumbsDown}
      onDeleteComment={onDeleteComment}
      onRefresh={onRefresh}
    />
  );
};

export default withRouter(PostViewContainer);
