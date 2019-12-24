import React from 'react';
import Loadable from 'react-loadable';
import styled from 'styled-components';
import { brandingColor } from '../lib/styles/branding';

const LoadingWrap = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${brandingColor.point[6]};
`;

const Loading = () => {
  return (
    <LoadingWrap>
      페이지 로딩중...
    </LoadingWrap>
  )
};

export const MainPage = Loadable({
  loader: () => import('./MainPage'),
  loading: Loading,
});
export const ProfilePage = Loadable({
  loader: () => import('./ProfilePage'),
  loading: Loading,
});
export const WritePage = Loadable({
  loader: () => import('./WritePage'),
  loading: Loading,
});
export const PostPage = Loadable({
  loader: () => import('./PostPage'),
  loading: Loading,
});
export const SearchedPostsPage = Loadable({
  loader: () => import('./SearchedPostsPage'),
  loading: Loading,
});
