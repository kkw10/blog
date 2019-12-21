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
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      border-bottom: 1px solid ${brandingColor.common[3]};

      svg {
        margin-right: 0.5rem;
      }

      span {
        font-size: 13px;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  color: ${(props) => (props.selectedMenu ? brandingColor.main[6] : brandingColor.common[6])};
  &:hover {
    color: ${brandingColor.main[6]};
  }
`;

const TabArea = ({ selectedMenu, onChangeMenu }) => {
  return (
    <TabAreaWrap>
      <ul>
        <li onClick={() => onChangeMenu('activity')}>
          <MenuButton selectedMenu={selectedMenu === 'activity'}>
            <FiActivity />
            <span>활동 내역</span>
          </MenuButton>
        </li>
        <li onClick={() => onChangeMenu('setting')}>
          <MenuButton selectedMenu={selectedMenu === 'setting'}>
            <IoMdSettings />
            <span>프로필 수정</span>
          </MenuButton>
        </li>
      </ul>
    </TabAreaWrap>
  )
}

export default TabArea;
