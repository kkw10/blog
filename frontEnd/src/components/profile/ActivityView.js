import React from 'react';
import styled from 'styled-components';
import { brandingColor } from '../../lib/styles/branding';

const ActivityViewWrap = styled.div`
  h2 {
    font-size: 20px;
    margin-bottom: 2rem;
    color: ${brandingColor.point[6]};    
  }
  .temp {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${brandingColor.common[6]};
    font-size: 20px;
  }
`;

const ActivityView = () => {
  return (
    <ActivityViewWrap>
      <h2>활동 내역</h2>
      <div className="temp">준비중입니다...</div>
    </ActivityViewWrap>
  )
};

export default ActivityView;