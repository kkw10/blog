import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

// components...
import ValidationMessage from './ValidationMessage';

const AuthFieldsetWrap = styled.fieldset`
  transition: 0.3s ease-in-out;
  margin-top: 0px;
  ${props => (
    (props.validationError === false) || (props.validationError === null) ? (
      'margin-top: 0px;'
    ) : (
      'margin-top: 30px'
    )
  )}
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.3rem;
  max-width: 360px;
  width: 100%;
  height: 36px;
  font-size: 14px;
  border: 1px solid ${brandingColor.common[3]};
  border-radius: 5px;
  margin-bottoM: 0.5rem;
  background: #fff;
  transition: 0.3s;
  &:focus {
    border-color: ${brandingColor.point[5]};
  }

  ${props => (
    props.validationError === false ? (
      `background: ${brandingColor.green[0]};`
    ) : (
      'background: white;'
    )
  )}
`;

const AuthFieldset = ({
  name,
  placeholder,
  value,
  onChange,
  validationError,
  validationMessage,
}) => {
  return (
    <AuthFieldsetWrap validationError={validationError}>
      <ValidationMessage
        validationError={validationError}
        message={validationMessage}
      />
      <StyledInput
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        validationError={validationError}
      />
    </AuthFieldsetWrap>
  )
};

export default AuthFieldset;
