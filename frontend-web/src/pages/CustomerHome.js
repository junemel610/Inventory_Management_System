import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Card from '../components/Card';
import BackgroundContainer from '../components/BackgroundContainer';
import { useCart } from '../contexts/CartContext';
import tanks from '../data';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px auto;
  gap: 10px;
  padding: 10px;
  background-color: rgba(32, 28, 28, 0.55);
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.32);
  margin-top: 60px;
  max-width: 1000px;

  @media (max-width: 768px) {
    padding: 5px;
    gap: 5px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
  background-color: rgba(32, 28, 28, 0.66);
  border-radius: 4px;
  min-height: 500px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    padding: 15px;
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

const TabButton = styled.button`
  padding: 10px 15px;
  background-color: #ddd;
  border-radius: 5px;
  min-width: 120px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.32);
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: 'JosefinSans', sans-serif;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
    min-width: 100px;
  }
`;

const CustomerHome = () => {
  const [selectedWeight, setSelectedWeight] = useState('2.7kg');
  const { addToCart, getCartItemCount } = useCart();
  const navigate = useNavigate();

  const filteredTanks = tanks.filter(tank => tank.weight === selectedWeight);

  const handleAddToCart = (tank, quantity) => {
    addToCart(tank, quantity);
    alert(`${tank.brand} added to cart. Quantity: ${quantity}`);
  };

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading">
        <HeaderButton onClick={() => navigate('/cart')}>Cart ({getCartItemCount()})</HeaderButton>
        <HeaderButton onClick={() => navigate('/order-history')}>Orders</HeaderButton>
        <HeaderButton onClick={() => navigate('/user-profile')}>Profile</HeaderButton>
        <HeaderButton onClick={() => navigate('/login')}>Logout</HeaderButton>
      </Header>
      <TabContainer>
        {['2.7kg', '11kg', '22kg', '50kg'].map(weight => (
          <TabButton key={weight} onClick={() => setSelectedWeight(weight)}>
            {weight}
          </TabButton>
        ))}
      </TabContainer>
      <Content>
        {filteredTanks.map(tank => (
          <Card key={tank.id} tank={tank} addToCart={handleAddToCart} />
        ))}
      </Content>
    </BackgroundContainer>
  );
};

export default CustomerHome;