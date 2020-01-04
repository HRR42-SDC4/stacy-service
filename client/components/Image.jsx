import React from 'react';
import styled from 'styled-components';

const BigImgContainer = styled.div`
  display: inline-block;
  min-width: 384px;
  height: 384px;
  overflow:hidden;
  background-color: #000;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopSmallContainer = styled(BigImgContainer)`
  border: 3px solid #fff;
  min-width: 190px;
  height: 192px;
  border-top: 0;
`;

const BottomSmallContainer = styled(TopSmallContainer)`
  border: 3px solid #fff;
  border-bottom: 0;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: .2s ease-in-out;

  &:hover {
    transform: scale(1.01);
    opacity: .9;
  }
`;
StyledImg.displayName = 'styledimg';


const Image = ({ src, handleClick, idx, images }) => {
  if (idx % 3 === 0) {
    return (
      <BigImgContainer>
        <StyledImg src={src} onClick={() => handleClick(idx)} />
      </BigImgContainer>
    );
  } else if (idx % 3 === 1) {
    return (
      <ColumnContainer>
        <TopSmallContainer>
          <StyledImg src={src} onClick={() => handleClick(idx)} />
        </TopSmallContainer>
        <BottomSmallContainer>
          <StyledImg src={images[idx + 1]} onClick={() => handleClick(idx + 1)} />
        </BottomSmallContainer>
      </ColumnContainer>
    );
  } else {
    return null;
  }
};

export default Image;
