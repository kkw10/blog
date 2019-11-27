import React from 'react';
import { IoMdSettings } from 'react-icons/io';
import { FiActivity } from 'react-icons/fi';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const TabAreaWrap = styled.div`
  & > ul {
    border-radius: 15px;

    & > li {
      padding: 1rem 0.5rem;
      color: ${brandingColor.common[6]};
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      border-bottom: 1px solid ${brandingColor.common[3]};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s ease-in-out;

      svg {
        margin-right: 0.5rem;
      }

      span {
        font-size: 13px;
      }

      &:hover {
        color: ${brandingColor.main[6]};
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const TabArea = () => {
  return (
    <TabAreaWrap>
      <ul>
        <li>
          <FiActivity />
          <span>활동 내역</span>
        </li>
        <li>
          <IoMdSettings />
          <span>프로필 수정</span>
        </li>
      </ul>
    </TabAreaWrap>
  )
}

export default TabArea;
