import React from 'react';
import styled, { css } from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const StyledButton = styled.button`
  background: #fff;
  color: ${brandingColor.common[8]};
  border: 1px solid ${brandingColor.point[6]};

  ${props => (
    props.background && css`
      background: ${brandingColor[props.background][7]};
      color: #fff;
      border: 1px solid #fff;
    `
  )}

  ${props => (
    props.size === 'mx' && css`
      width: 100%;
      height: 36px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      border-radius: 5px;      
    `
  )}

  ${props => (
    props.size === 'lg' && css`
      width: 120px;
      height: 32px;
      text-align: center;
      font-size: 13px;
      font-weight: bold;
      border-radius: 5px;      
    `
  )}
`

const Button = ({ placeholder, ...props }) => {
  return (
    <StyledButton {...props}>
      { placeholder }
    </StyledButton>
  )
}

export default Button;
