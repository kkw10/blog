import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PostsView from '../../components/posts/postsView';
import { readPosts, clearPosts } from '../../models/actions/posts';
import { getTargetProfile } from '../../models/actions/user';
import LoadingWrap from '../../components/common/LoadingWrap';

const PostsViewContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const [pageId, setPageId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [liked, setLiked] = useState(false);
  const { postsData, postsError, lastPage } = useSelector(({ posts }) => ({
    postsData: posts.result,
    postsError: posts.postsError,
    lastPage: posts.lastPage,
  }));

  const onGetTargetProfile = useCallback((profileId) => {
    dispatch(getTargetProfile(profileId));
  }, [dispatch]);

  useEffect(() => { // 유저 아이디 검사, 경로 검사 및 쿼리 파싱
    if (match.params.UserId) {
      setUserId(match.params.UserId);
      setPageId(match.params.UserId);
    }

    if (match.params.TagName) {
      setTagName(match.params.TagName);
      setPageId(match.params.TagName);
    }

    // for pagination
    const { q, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (match.path === '/posts/liked') {
      setLiked(true);
      setPageId('liked');
    }

    dispatch(readPosts({
      tagName,
      query: q,
      userId,
      liked,
      page,
    }));
  }, [
    dispatch,
    location.search,
    userId, tagName,
    match.params.UserId,
    match.params.TagName,
    liked,
  ]);

  useEffect(() => { // 언마운트될 때 초기화
    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <LoadingWrap
      loadingType="posts/READ_POSTS"
      styleType="posts"
      size={20}
      color="#fff"
      isMulti={10}
    >
      <PostsView
        pageId={pageId}
        postsData={postsData}
        potsError={postsError}
        lastPage={lastPage}
        onGetTargetProfile={onGetTargetProfile}
      />
    </LoadingWrap>
  );
};

export default withRouter(PostsViewContainer);
