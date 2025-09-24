import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const About = () => (
  <Container>
    <h1>About Us</h1>
    <p>This is the Inventory Management System frontend.</p>
  </Container>
);

export default About;