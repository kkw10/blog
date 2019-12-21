import React from 'react';
import styled from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa';

// lib...
import { brandingColor } from '../../lib/styles/branding';

const ValidationMessageWrap = styled.div`
  position: absolute;
  right: 0;
  top: -30px;
`;

const StyledP = styled.p`
  height: 0;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0px;
  color: transparent;
  background: transparent;
  text-align: right;
  display: inline-block;
  transition: 0.3s ease-in-out;

  & > svg {
    margin-right: 0.3rem;
  }

  ${props => (
    props.isError ? (
      `
      font-size: 10px;
      height: auto;
      color: #fff;
      background: ${brandingColor.red[5]};
      `
    ) : (
      `
      font-size: 0px;
      height: 0;
      color: transparent;
      background: transparent;
      `
    )
  )}
`;

const ValidationMessage = ({ message, validationError }) => {
  return (
    <ValidationMessageWrap>
      <StyledP isError={validationError}>
        <FaExclamationCircle />
        {message}
      </StyledP>
    </ValidationMessageWrap>
  )
};

export default ValidationMessage;