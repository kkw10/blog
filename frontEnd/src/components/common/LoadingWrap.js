import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { CircleSpinner } from 'react-spinners-kit';
import { brandingColor } from '../../lib/styles/branding';

const SpinnerWrap = styled.div`
  ${props => (
    props.styleType === 'posts' && css`
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
    `
  )}

  ${props => (
    props.styleType === 'post' && css`
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
    `
  )}

  ${props => (
    props.styleType === 'follow' && css`
      width: 450px;
      height: 450px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;     
    `
  )}
  
  ${props => (
    props.styleType === 'comments' && css`
      text-align: center;
      & > * {
        display: inline-block;
      }
    `
  )}    
`;

const LoadingWrap = ({
  children,
  loadingType,
  styleType,
  size,
  color,
  isMulti,
}) => {
  const loading = useSelector(({ loading }) => loading);

  const renderingSpinner = () => {
    if (isMulti) { // 리스트 형태 로딩
      return (
        <SpinnerWrap styleType={styleType}>
          {[...Array(isMulti)].map(() => (
            <li>
              <CircleSpinner
                size={size}
                color={color}
                loading={loading.loadingType}
              />
            </li>
          ))}
        </SpinnerWrap>
      );
    }

    return ( // 단일 형태 로딩
      <SpinnerWrap styleType={styleType}>
        <CircleSpinner
          size={size}
          color={color}
          loading={loading.loadingType}
        />
      </SpinnerWrap>
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
