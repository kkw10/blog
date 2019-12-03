import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { brandingColor } from '../../lib/styles/branding';

const PageNumWrap = styled.div`
  padding: 0.4rem;
  margin-right: 1rem;
  border-radius: 15px;
  background: ${brandingColor.common[3]};

  svg {
    color: #fff;
    cursor: pointer;
    font-size: 20px;
  }

  .up {
    margin-bottom: 1rem;
  }

  .down {
    margin-top: 1rem;
  }

  li {
    cursor: pointer;
    margin-bottom: 1.5rem;
    color: #fff;
    font-weight: bold;
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const PageNum = ({ pageId, lastPage }) => {
  const [pageArr, setPageArr] = useState([]);

  const buildLink = (page) => {
    const query = qs.stringify({ page });

    if (pageId) {
      return `/posts/${pageId}?${query}`;
    }

    return `/?${query}`;
  }

  useEffect(() => {
    const newPageArr = [...Array(parseInt(lastPage, 10)).keys()];
    setPageArr(newPageArr);
  }, [lastPage]);

  return (
    <PageNumWrap>
      <TiArrowSortedUp className="up" />
      <ol>
        {pageArr.map((page) => (
          <li key={page}>
            <Link to={buildLink(page + 1)}>{page + 1}</Link>
          </li>
        ))}
      </ol>
      <TiArrowSortedDown className="down" />
    </PageNumWrap>
  );
};

export default PageNum;
