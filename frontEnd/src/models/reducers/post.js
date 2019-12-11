import {
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
  READ_COMMENTS,
  READ_COMMENTS_SUCCESS,
  READ_COMMENTS_FAILURE,
  CLEAR_FORM,
  THUMBS_UP_SUCCESS,
  THUMBS_UP_FAILURE,
  THUMBS_DOWN_SUCCESS,
  THUMBS_DOWN_FAILURE,
  RECOMEND_SUCCESS,
  RECOMEND_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  UPDATE_SUB_COMMENT_SUCCESS,
  UPDATE_SUB_COMMENT_FAILURE,
  SUB_COMMENTING_SUCCESS,
  SUB_COMMENTING_FAILURE,
  READ_SUB_COMMENTS_SUCCESS,
  READ_SUB_COMMENTS_FAILURE,
  HIDE_SUB_COMMENTS,
  REFRESH_COMMENTS_SUCCESS,
  REFRESH_COMMENTS_FAILURE,
} from '../actions/post';

const initialState = {
  postResult: null,
  commentsResult: null,
  hasMoreComments: true,
  postError: null,
  recomendError: null,
  commentError: null,
  thumbsError: null,
  clearedForm: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POST:
      return {
        ...initialState,
      };
    case READ_POST_SUCCESS:
      return {
        ...state,
        postResult: action.payload.post,
        commentsResult: action.payload.comments,
        postError: null,
      };
    case READ_POST_FAILURE:
      return {
        ...state,
        postResult: null,
        commentsResult: null,
        postError: action.payload,
      };
    case READ_COMMENTS:
      return {
        ...state,
        commentsResult: action.lastCommentId ? [] : [...state.commentsResult],
        hasMorePost: action.payload.lastCommentId ? state.hasMorePost : true,
      };
    case READ_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsResult: [...state.commentsResult, ...action.payload],
        hasMoreComments: action.payload.length === 10,
        commentError: null,
      };
    case REFRESH_COMMENTS_SUCCESS:
      return {
        ...state,
        commentsResult: action.payload,
        hasMoreComments: true,
        commentError: null,
      };
    case READ_COMMENTS_FAILURE:
    case REFRESH_COMMENTS_FAILURE:
      return {
        ...state,
        commentsResult: null,
        commentError: action.payload,
      };
    case CLEAR_FORM:
      return {
        ...state,
        clearedForm: !state.clearedForm,
      };
    case THUMBS_UP_SUCCESS: {
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
        thumbsError: null,
      };
    }
    case RECOMEND_SUCCESS:
      return {
        ...state,
        postResult: {
          ...state.postResult,
          Recomenders: action.payload,
        },
      };
    case THUMBS_DOWN_SUCCESS: {
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
        thumbsError: null,
      };
    }
    case RECOMEND_FAILURE:
      return {
        ...state,
        recomendError: action.payload,
      };
    case THUMBS_UP_FAILURE:
      return {
        ...state,
        thumbsError: action.payload,
      };
    case THUMBS_DOWN_FAILURE:
      return {
        ...state,
        thumbsError: action.payload,
      };
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
        console.log(2)
        newComments = newComments.filter((comment) => comment.id !== targetId);
      }

      return {
        ...state,
        commentsResult: newComments,
        commentError: null,
      };
    }
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        commentError: action.payload,
      };
    case UPDATE_COMMENT_SUCCESS: {
      const targetIndex = [...state.commentsResult].findIndex((comment) => (
        comment.id === action.payload.id
      ));
      const updatedComments = [...state.commentsResult];
      updatedComments[targetIndex].contents = action.payload.contents;

      return {
        ...state,
        commentsResult: updatedComments,
        commentError: null,
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
        commentError: null,
      };
    }
    case UPDATE_COMMENT_FAILURE:
    case UPDATE_SUB_COMMENT_FAILURE: {
      return {
        ...state,
        commentError: action.payload,
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
        commentError: null,
      };
    }
    case SUB_COMMENTING_FAILURE: {
      return {
        ...state,
        commentError: action.payload,
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
      };
    }
    case READ_SUB_COMMENTS_FAILURE: {
      return {
        ...state,
        commentError: action.payload,
      };
    }
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
    default:
      return state;
  }
};

export default reducer;
