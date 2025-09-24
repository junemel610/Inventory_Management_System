import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';

const Content = styled.div`
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

const Form = styled.form`
  width: 100%;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  color: black;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  background-color: #007BFF;
  border-radius: 5px;
  align-items: center;
  box-shadow: 0 2px rgba(0, 0, 0, 0.8);
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${username}\nFull Name: ${fullName}\nContact Number: ${contactNumber}\nAddress: ${address}\nEmail: ${email}`);
    navigate('/customer-home');
  };

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading" />
      <Content>
        <Title>Create Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <Input
            placeholder="Contact Number"
            value={contactNumber}
            onChange={e => setContactNumber(e.target.value)}
            type="tel"
          />
          <Input
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Button type="submit">Create Account</Button>
        </Form>
      </Content>
    </BackgroundContainer>
  );
};

export default CreateUser;