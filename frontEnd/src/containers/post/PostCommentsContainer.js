import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Component...
import PostComments from '../../components/post/PostComments';

// Actions...
import {
  initialize,
  changeField,
  setOriginalComment,
} from '../../models/actions/write';
import {
  refreshComments,
  commenting,
  readSubComments,
  hideSubComments,
  updateComment,
  updateSubComment,
  deleteComment,
  thumbs,
  subCommenting,
} from '../../models/actions/post';
import {
  getTargetProfile,
} from '../../models/actions/user';
import {
  toggling,
  clearToggle,
} from '../../models/actions/toggle';

const PostCommentsContainer = ({
  match,
}) => {
  const dispatch = useDispatch();
  const me = useSelector(({ user }) => user);
  const postId = match.params.PostId;
  const {
    commentsResult,
    commentError,
  } = useSelector(({ post }) => ({
    commentsResult: post.commentsResult,
    commentError: post.commentError,
  }));
  const {
    writtenComment,
    editingCommentData,
  } = useSelector(({ write }) => ({
    writtenComment: write.comment,
    writeResult: write.result,
    editingCommentData: {
      type: 'comment',
      contents: write.comment,
      id: write.editingCommentId,
    },
  }));

  // 에디터 입력 값 관리
  const onChangeField = useCallback((payload) => {
    dispatch(changeField(payload));
  }, [dispatch]);

  // 초기화
  const onInitialize = useCallback(() => {
    dispatch(initialize());
    dispatch(clearToggle());
  }, [dispatch]);

  // 작성한 댓글 등록하기
  const onCommentSubmit = useCallback((e, commentId) => {
    e.preventDefault();
    if (!writtenComment) return;

    if (commentId) { // 대댓글 등록
      dispatch(subCommenting({
        commentId,
        contents: writtenComment,
      }));
      dispatch(clearToggle());
      dispatch(readSubComments(commentId));
    } else { // 댓글 등록
      dispatch(commenting({
        postId,
        contents: writtenComment,
      }));
    }
  }, [writtenComment, postId, dispatch]);

  // 댓글 수정하기 전 기존 데이터 필드에 불러오기
  const onEditingFieldSetting = useCallback((id, contents) => {
    dispatch(setOriginalComment({
      contents,
      id,
    }));
    dispatch(toggling(`commentMore-${id}`));
  }, [dispatch, commentsResult]);

  // 댓글 삭제하기
  const onDeleteComment = useCallback((commentId, parentId) => {
    if (parentId) {
      dispatch(deleteComment({
        commentId,
        parentId,
      }));
    } else {
      dispatch(deleteComment({
        commentId,
      }));
    }
  }, [dispatch]);

  // 댓글 수정하기
  const onUpdateComment = useCallback((commentId, parentId) => {
    if (parentId) {
      dispatch(updateSubComment({
        commentId,
        parentId,
        contents: writtenComment,
      }));
    } else {
      dispatch(updateComment({
        postId,
        commentId,
        contents: writtenComment,
      }));
    }

    dispatch(initialize());
  }, [dispatch, writtenComment]);

  // 댓글 좋아요, 싫어요
  const onThumbs = useCallback((type, commentId) => {
    dispatch(thumbs({
      type,
      postId,
      commentId,
    }));
  }, [dispatch]);

  // 댓글 새로고침
  const onRefresh = useCallback(() => {
    dispatch(refreshComments({ postId }));
  }, [dispatch]);

  // 대댓글 보기
  const onShowSubComment = useCallback((commentId) => {
    dispatch(readSubComments(commentId));
  }, [dispatch]);

  // 대댓글 숨기기
  const onHideSubComment = useCallback((commentId) => {
    dispatch(hideSubComments(commentId));
  });

  // 유저 프로필 검색용 ( 유저 네임 클릭 이벤트에 사용 )
  const onGetTargetProfile = useCallback((profileId) => {
    dispatch(getTargetProfile(profileId));
  }, [dispatch]);

  return (
    <>
      {commentsResult && (
        <PostComments
          me={me}
          commentsResult={commentsResult}
          editingCommentData={editingCommentData}
          commentError={commentError}
          onInitialize={onInitialize}
          onChangeField={onChangeField}
          onCommentSubmit={onCommentSubmit}
          onEditingFieldSetting={onEditingFieldSetting}
          onDeleteComment={onDeleteComment}
          onUpdateComment={onUpdateComment}
          onThumbs={onThumbs}
          onRefresh={onRefresh}
          onShowSubComment={onShowSubComment}
          onHideSubComment={onHideSubComment}
          onGetTargetProfile={onGetTargetProfile}
        />
      )}
    </>
  );
};

export default withRouter(PostCommentsContainer);
