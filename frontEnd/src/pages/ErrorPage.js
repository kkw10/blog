import React from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorContainer from '../containers/common/ErrorContainer';

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>에러발생 - SPACER</title>
      </Helmet>
      <ErrorContainer />
    </>
  );
};

export default ErrorPage;
