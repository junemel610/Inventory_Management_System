import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
`;

const Home = () => (
  <Container>
    <Title>Welcome to Inventory Management System</Title>
  </Container>
);

export default Home;