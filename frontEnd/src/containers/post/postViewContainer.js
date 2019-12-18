import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostView from '../../components/post/PostView';
import {
  readPost,
  readComments,
  recomend,
} from '../../models/actions/post';
import {
  initialize,
  setOriginalPost,
} from '../../models/actions/write';
import { getTargetProfile } from '../../models/actions/user';
import { toggling } from '../../models/actions/toggle';
import { remove } from '../../lib/api/post';
import LoadingWrap from '../../components/common/LoadingWrap';

const PostViewContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const {
    postResult,
    commentsResult,
    hasMoreComments,
    isLoading,
    postError,
    commentError,
    user,
  } = useSelector(({ post, user }) => ({
    postResult: post.postResult,
    commentsResult: post.commentsResult,
    hasMoreComments: post.hasMoreComments,
    isLoading: post.isLoading,
    postError: post.postError,
    commentError: post.commentError,
    user: user.user,
  }));
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

  const onRecomend = useCallback(() => {
    dispatch(recomend(postId));
  }, [dispatch]);

  const onGetTargetProfile = useCallback((profileId) => {
    dispatch(getTargetProfile(profileId));
  }, [dispatch]);

  const onScroll = useCallback(() => {
    if (!hasMoreComments) return;
    const { scrollY } = window;
    const { clientHeight } = document.documentElement;
    const { scrollHeight } = document.documentElement;

    if (Math.ceil(scrollY + clientHeight) === scrollHeight) {
      if (isLoading) return;
      const lastIndex = commentsResult.length - 1;
      const lastCommentId = commentsResult[lastIndex].id;
      dispatch(readComments({ postId, lastCommentId }));
    }
  }, [commentsResult, hasMoreComments, isLoading]);

  useEffect(() => { // 포스트 읽기
    dispatch(readPost(postId));
    dispatch(readComments({ postId }));
  }, [dispatch, postId]);

  useEffect(() => { // 포스트 로딩 후 글의 저자로 유저 카드 내역 변경
    if (postResult) {
      dispatch(getTargetProfile(postResult.UserId));
    }
  }, [postResult]);

  useEffect(() => { // 코멘트 작성 후 초기화
    if (writeResult) {
      dispatch(readComments({ postId }));
      dispatch(initialize());
    }
  }, [dispatch, writeResult]);

  useEffect(() => { // 스크롤 이벤트 등록 및 해제 ( for 댓글 인피니티 스크롤 )
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [commentsResult, hasMoreComments, isLoading]);

  return (
    <LoadingWrap
      loadingType="post/READ"
      styleType="post"
      size={30}
      color="#fff"
    >
      <PostView
        user={user}
        postResult={postResult}
        commentsResult={commentsResult}
        postError={postError}
        commentError={commentError}
        onEdit={onEdit}
        editingCommentData={editingCommentData}
        onDelete={onDelete}
        onRecomend={onRecomend}
        onGetTargetProfile={onGetTargetProfile}
      />
    </LoadingWrap>
  );
};

export default withRouter(PostViewContainer);
