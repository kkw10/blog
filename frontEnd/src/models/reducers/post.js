import {
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
  READ_COMMENTS,
  READ_COMMENTS_SUCCESS,
  READ_COMMENTS_FAILURE,
  READ_SUB_COMMENTS_SUCCESS,
  READ_SUB_COMMENTS_FAILURE,
  COMMENTING_SUCCESS,
  COMMENTING_FAILURE,
  SUB_COMMENTING_SUCCESS,
  SUB_COMMENTING_FAILURE,
  THUMBS_SUCCESS,
  THUMBS_FAILURE,
  RECOMEND_SUCCESS,
  RECOMEND_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  UPDATE_SUB_COMMENT_SUCCESS,
  UPDATE_SUB_COMMENT_FAILURE,
  HIDE_SUB_COMMENTS,
  REFRESH_COMMENTS_SUCCESS,
  REFRESH_COMMENTS_FAILURE,
} from '../actions/post';

const initialState = {
  postResult: null,
  commentsResult: [],
  hasMoreComments: true, // 가져올 댓글이 더 있는지 확인
  isLoading: false, // 댓글이 로딩 중인지 확인
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ETC
    case READ_POST:
      return {
        ...initialState,
      };
    case READ_COMMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_SUB_COMMENTS: {
      const targetId = action.payload;
      const targetIndex = [...state.commentsResult].findIndex((comment) => (
        comment.id === targetId
      ));
      const newCommentsResult = [...state.commentsResult];
      newCommentsResult[targetIndex].isOpen = false;
      return {
        ...state,
        commentsResult: newCommentsResult,
      };
    }
    // SUCCESS
    case READ_POST_SUCCESS: {
      return {
        ...state,
        postResult: action.payload,
        error: null,
      };
    }
    case READ_COMMENTS_SUCCESS: {
      return {
        ...state,
        commentsResult: [...state.commentsResult, ...action.payload],
        hasMoreComments: action.payload.length === 10,
        isLoading: false,
        error: null,
      };
    }
    case READ_SUB_COMMENTS_SUCCESS: {
      const { parentId } = action.payload;
      const parentIndex = [...state.commentsResult].findIndex((comment) => (
        comment.id === parentId
      ));
      const newCommentsResult = [...state.commentsResult];
      newCommentsResult[parentIndex].isOpen = true;
      newCommentsResult[parentIndex].ChildComment = action.payload.subComments;
      return {
        ...state,
        commentsResult: newCommentsResult,
        error: null,
      };
    }
    case REFRESH_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsResult: action.payload,
        hasMoreComments: true,
        isLoading: false,
        error: null,
      };
    case COMMENTING_SUCCESS: {
      const newCommentsResult = [...state.commentsResult];
      newCommentsResult.unshift(action.payload);
      return {
        ...state,
        commentsResult: newCommentsResult,
        error: null,
      };
    }
    case SUB_COMMENTING_SUCCESS: {
      const targetId = action.payload.parentCommentId;
      const targetIndex = [...state.commentsResult].findIndex((comment) => (
        comment.id === targetId
      ));
      const newCommentsResult = [...state.commentsResult];
      newCommentsResult[targetIndex].subCommentsNumb = state.commentsResult[targetIndex].subCommentsNumb + 1;

      return {
        ...state,
        commentsResult: newCommentsResult,
        error: null,
      };
    }
    case RECOMEND_SUCCESS:
      return {
        ...state,
        postResult: {
          ...state.postResult,
          Recomenders: action.payload,
        },
        error: null,
      };
    case THUMBS_SUCCESS: {
      const newResult = [
        ...state.commentsResult,
      ];
      const targetIndex = state.commentsResult.findIndex((v) => (
        v.id === action.payload.id
      ));

      newResult[targetIndex] = action.payload;

      return {
        ...state,
        commentsResult: newResult,
        error: null,
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      const { parentId, targetId, subCommentsNumb } = action.payload;
      let newComments = [...state.commentsResult];

      if (parentId) {
        const parentIndex = newComments.findIndex((comment) => (
          comment.id === Number(parentId)
        ));
        newComments[parentIndex].ChildComment = newComments[parentIndex].ChildComment.filter((comment) => comment.id !== targetId);
        newComments[parentIndex].subCommentsNumb = subCommentsNumb;
      } else {
        newComments = newComments.filter((comment) => comment.id !== targetId);
      }

      return {
        ...state,
        commentsResult: newComments,
        error: null,
      };
    }
    case UPDATE_COMMENT_SUCCESS: {
      const targetIndex = [...state.commentsResult].findIndex((comment) => (
        comment.id === action.payload.id
      ));
      const updatedComments = [...state.commentsResult];
      updatedComments[targetIndex].contents = action.payload.contents;

      return {
        ...state,
        commentsResult: updatedComments,
        error: null,
      };
    }
    case UPDATE_SUB_COMMENT_SUCCESS: {
      const newCommentResults = [...state.commentsResult];
      const parentIndex = [...state.commentsResult].findIndex((comment) => (
        comment.id === action.payload.parentId
      ));
      const childIndex = newCommentResults[parentIndex].ChildComment.findIndex((comment) => (
        comment.id === action.payload.childId
      ));
      newCommentResults[parentIndex].ChildComment[childIndex].contents = action.payload.editedContents;

      return {
        ...state,
        commentsResult: newCommentResults,
        error: null,
      };
    }
    // FAILURE
    case READ_POST_FAILURE:
    case READ_COMMENTS_FAILURE:
    case REFRESH_COMMENTS_FAILURE:
    case COMMENTING_FAILURE:
    case SUB_COMMENTING_FAILURE:
    case READ_SUB_COMMENTS_FAILURE:
    case DELETE_COMMENT_FAILURE:
    case UPDATE_COMMENT_FAILURE:
    case UPDATE_SUB_COMMENT_FAILURE:
    case RECOMEND_FAILURE:
    case THUMBS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
