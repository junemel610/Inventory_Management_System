import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background-image: url('/bgilpg.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  min-height: 100%;
`;

const BackgroundContainer = ({ children }) => {
  return (
    <Background>
      <Container>
        {children}
      </Container>
    </Background>
  );
};

export default BackgroundContainer;