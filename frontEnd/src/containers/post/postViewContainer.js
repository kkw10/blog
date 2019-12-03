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
  updateComment,
} from '../../models/actions/post';
import {
  initialize,
  setOriginalPost,
  setOriginalComment,
  changeField,
  commenting,
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
    commentContent,
    writeResult,
    editingCommentData,
  } = useSelector(({ write }) => ({
    commentContent: write.comment,
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

  const onEditComment = useCallback((id) => {
    const targetComment = commentsResult.filter((comment) => comment.id === id)[0];
    const data = {
      contents: targetComment.contents,
      id,
    };
    dispatch(setOriginalComment(data));
  }, [dispatch, commentsResult]);

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

  const onToggling = useCallback((type) => {
    dispatch(toggling(type));
  }, [dispatch]);

  const onRecomend = useCallback(() => {
    dispatch(recomend(postId));
  }, [dispatch]);

  const onThumbsUp = useCallback((commentId) => {
    dispatch(thumbsUp({
      postId,
      commentId,
    }));
  }, [dispatch]);

  const onThumbsDown = useCallback((commentId) => {
    dispatch(thumbsDown({
      postId,
      commentId,
    }));
  }, [dispatch]);

  const onDeleteComment = useCallback((commentId) => {
    dispatch(deleteComment({
      postId,
      commentId,
    }));
  }, [dispatch]);

  const onUpdateComment = useCallback((commentId) => {
    dispatch(updateComment({
      postId,
      commentId,
      contents: commentContent,
    }));
    dispatch(initialize());
  }, [dispatch, commentContent]);

  const onRefresh = useCallback(() => {
    dispatch(readComments(postId));
  }, [dispatch]);

  const onEditCancel = useCallback(() => {
    dispatch(initialize());
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
      onEditComment={onEditComment}
      onEditCancel={onEditCancel}
      editingCommentData={editingCommentData}
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
      onUpdateComment={onUpdateComment}
      onGetTargetProfile={onGetTargetProfile}
      onRefresh={onRefresh}
    />
  );
};

export default withRouter(PostViewContainer);
