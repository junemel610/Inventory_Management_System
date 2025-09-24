import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  background-color: #201c1c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 15px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  font-family: 'Kanit', sans-serif;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Header = ({ title, children }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <ButtonsContainer>
        {children}
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Header;