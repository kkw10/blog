import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import PostsView from '../../components/posts/postsView';
import { readPosts } from '../../models/actions/posts';
import { getTargetProfile } from '../../models/actions/user';

const PostsViewContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [tagName, setTagName] = useState(null);
  const { postsData, postsError, lastPage } = useSelector(({ posts }) => ({
    postsData: posts.result,
    postsError: posts.postsError,
    lastPage: posts.lastPage,
  }));

  const onGetTargetProfile = useCallback((profileId) => {
    dispatch(getTargetProfile(profileId));
  }, [dispatch]);

  useEffect(() => { // 유저 아이디 검사 및 페이지 넘버 쿼리 파싱
    if (match.params.UserId) {
      setUserId(match.params.UserId);
    }

    if (match.params.TagName) {
      setTagName(match.params.TagName);
    }

    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(readPosts({ tagName, userId, page }));
  }, [dispatch, location.search, userId, tagName, match.params.UserId, match.params.TagName]);

  return (
    <PostsView
      pageId={userId}
      postsData={postsData}
      potsError={postsError}
      lastPage={lastPage}
      onGetTargetProfile={onGetTargetProfile}
    />
  );
};

export default withRouter(PostsViewContainer);
