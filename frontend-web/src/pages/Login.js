import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(32, 28, 28, 0.5);
  border: 0.2px solid;
  margin: 30px auto;
  max-width: 1000px;
  width: 90%;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.32);

  @media (max-width: 768px) {
    flex-direction: column;
    width: 95%;
  }
`;

const AccountType = styled.div`
  flex: 40%;
  background-color: rgba(32, 28, 28, 0.8);
  margin-right: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.32);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 5px;
    flex: none;
  }
`;

const SelectText = styled.h2`
  font-family: 'Freeman', sans-serif;
  font-size: 36px;
  color: #E95D23;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`;

const TouchableButton = styled.button`
  background-color: #E95D23;
  padding: 16px 24px;
  border-radius: 8px;
  margin: 12px 0;
  height: 60px;
  width: 160px;
  border: none;
  color: cornsilk;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 55px;
    font-size: 16px;
    padding: 14px 20px;
  }
`;

const Forms = styled.div`
  flex: 60%;
  background-color: rgba(32, 28, 28, 0.8);
  margin-left: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.32);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 5px;
    flex: none;
  }
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  font-family: 'Freeman', sans-serif;
  font-size: 36px;
  color: #E95D23;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 14px 16px;
  margin: 12px 0;
  width: 100%;
  color: #333;
  font-family: 'Kanit', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid #ddd;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 14px;
  }
`;

const LoginButton = styled.button`
  background-color: #28a745;
  padding: 14px 28px;
  width: 120px;
  align-self: center;
  border-radius: 8px;
  margin-bottom: 20px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100px;
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const CreateAccountText = styled.p`
  font-family: 'JosefinSans', sans-serif;
  font-weight: bold;
  color: cornsilk;
  text-align: center;
`;

const CreateAccountButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  align-self: center;
  border: none;
  background: none;
  color: #E95D23;
  font-weight: bold;
  font-family: 'JosefinSans', sans-serif;
  cursor: pointer;
`;

const Login = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const navigate = useNavigate();

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading" />
      <FormContainer>
        <AccountType>
          <SelectText>Select Account Type</SelectText>
          <TouchableButton
            onClick={() => {
              setShowCustomerForm(true);
              setShowAdminForm(false);
            }}
          >
            Customer
          </TouchableButton>
          <TouchableButton
            onClick={() => {
              setShowCustomerForm(false);
              setShowAdminForm(true);
            }}
          >
            Admin
          </TouchableButton>
        </AccountType>
        <Forms>
          {showCustomerForm && (
            <LoginForm>
              <FormTitle>Customer Login</FormTitle>
              <Input placeholder="Username" />
              <Input placeholder="Password" type="password" />
              <LoginButton onClick={() => navigate('/customer-home')}>Login</LoginButton>
              <CreateAccountText>Don't have an account?</CreateAccountText>
              <CreateAccountButton onClick={() => navigate('/create-user')}>Create a New Account</CreateAccountButton>
            </LoginForm>
          )}
          {showAdminForm && (
            <LoginForm>
              <FormTitle>Admin Login</FormTitle>
              <Input placeholder="Username" />
              <Input placeholder="Password" type="password" />
              <LoginButton onClick={() => navigate('/admin-home')}>Login</LoginButton>
            </LoginForm>
          )}
        </Forms>
      </FormContainer>
    </BackgroundContainer>
  );
};

export default Login;