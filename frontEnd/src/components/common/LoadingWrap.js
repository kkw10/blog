import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CircleSpinner } from 'react-spinners-kit';
import { brandingColor } from '../../lib/styles/branding';

const PostSpinner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;  
  height: calc(100vh - 10rem);
  background: ${brandingColor.common[4]};
  & > * {
    display: inline-block;
  }
`;

const PostsSpinner = styled.ul`
  width: 100%;
  & > li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;      
    height: 100px;
    margin-bottom: 1rem;
    background: ${brandingColor.common[4]};
  }
  & > li > * {
    display: inline-block;
  }
`;

const FollowSpinner = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;       
`;

const LoadingWrap = ({ children, loadingType, styleType }) => {
  const loading = useSelector(({ loading }) => loading);

  const renderingSpinner = () => {
    if (styleType === 'post') {
      return (
        <PostSpinner>
          <CircleSpinner
            size={30}
            color="#fff"
            loading={loading.loadingType}
          />
        </PostSpinner>
      );
    } else if (styleType === 'follow') {
      return (
        <FollowSpinner>
          <CircleSpinner
            size={30}
            color={brandingColor.point[6]}
            loading={loading.loadingType}
          />
        </FollowSpinner>
      );
    }

    return (
      <PostsSpinner>
        {[...Array(10)].map(() => (
          <li>
            <CircleSpinner
              size={20}
              color="#fff"
              loading={loading.loadingType}
            />
          </li>
        ))}
      </PostsSpinner>
    );
  };

  return (
    <>
      {loading[loadingType] ? (
        <>
          {renderingSpinner()}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrap;
