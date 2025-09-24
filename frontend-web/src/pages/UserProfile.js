import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';

const ViewContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 10px;
  }
`;

const ProfileText = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: white;
  text-align: center;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
  display: block;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #555;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #555;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 16px;
  height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
    height: 80px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
`;

const UpdateButton = styled.button`
  background-color: #28a745;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const ResetButton = styled.button`
  background-color: #6c757d;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const DisabledButton = styled(UpdateButton)`
  background-color: #6c757d;
  cursor: not-allowed;

  &:hover {
    background-color: #6c757d;
  }
`;

const HeaderButton = styled.button`
  margin: 0 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  font-family: 'JosefinSans', sans-serif;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0 5px;
  }
`;

const UserProfile = () => {
  const [username, setUsername] = useState('currentUsername');
  const [name, setName] = useState('currentName');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('currentMobileNumber');
  const [address, setAddress] = useState('currentAddress');
  const [isModified, setIsModified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Logic to populate the fields with current user data
  }, []);

  const handleUpdate = () => {
    console.log('Updated Information:', { username, name, password, mobileNumber, address });
  };

  const handleReset = () => {
    setUsername('currentUsername');
    setName('currentName');
    setPassword('');
    setMobileNumber('currentMobileNumber');
    setAddress('currentAddress');
    setIsModified(false);
    console.log('Form Reset');
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setIsModified(true);
  };

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading">
        <HeaderButton onClick={() => navigate('/cart')}>Cart</HeaderButton>
        <HeaderButton onClick={() => navigate('/order-history')}>Orders</HeaderButton>
        <HeaderButton onClick={() => navigate('/customer-home')}>Home</HeaderButton>
        <HeaderButton onClick={() => navigate('/login')}>Logout</HeaderButton>
      </Header>
      <ViewContent>
        <Content>
          <ProfileText>User Profile</ProfileText>

          <InputContainer>
            <Label>Username</Label>
            <Input
              value={username}
              onChange={e => handleInputChange(setUsername)(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={e => handleInputChange(setName)(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={e => handleInputChange(setPassword)(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label>Mobile Number</Label>
            <Input
              type="tel"
              value={mobileNumber}
              onChange={e => handleInputChange(setMobileNumber)(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <Label>Address</Label>
            <TextArea
              value={address}
              onChange={e => handleInputChange(setAddress)(e.target.value)}
            />
          </InputContainer>

          <ButtonContainer>
            {isModified ? (
              <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
            ) : (
              <DisabledButton disabled>Update</DisabledButton>
            )}
            <ResetButton onClick={handleReset}>Reset</ResetButton>
          </ButtonContainer>
        </Content>
      </ViewContent>
    </BackgroundContainer>
  );
};

export default UserProfile;