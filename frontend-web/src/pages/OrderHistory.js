import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';
import { useOrders } from '../contexts/OrderContext';

const TitleContainer = styled.div`
  align-content: center;
  padding: 10px 20px;
  background-color: black;
  border-radius: 5px;
  margin: 20px 0;
`;

const TitleText = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const ScrollViewContainer = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: black;
`;

const Content = styled.div`
  align-items: center;
  padding: 20px 0;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  width: 90%;
  box-shadow: 0 5px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  font-size: 16px;
  font-family: 'Freeman', sans-serif;
  color: #000;
  margin: 5px 0;
`;

const ProductsContainer = styled.div`
  margin-top: 10px;
`;

const HeaderButton = styled.button`
  margin: 0 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  font-family: 'JosefinSans', sans-serif;
  cursor: pointer;
`;

const OrderHistory = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading">
        <HeaderButton onClick={() => navigate('/cart')}>Cart</HeaderButton>
        <HeaderButton onClick={() => navigate('/checkout')}>Checkout</HeaderButton>
        <HeaderButton onClick={() => navigate('/user-profile')}>Profile</HeaderButton>
        <HeaderButton onClick={() => navigate('/login')}>Logout</HeaderButton>
      </Header>
      <TitleContainer>
        <TitleText>Orders</TitleText>
      </TitleContainer>
      <ScrollViewContainer>
        <Content>
          {orders.map(order => (
            <Card key={order._id}>
              <Text>Ref No: {order.ref_no}</Text>
              <Text>Customer: {order.customerName}</Text>
              <Text>Address: {order.customerAddress}</Text>
              <Text>Contact: {order.contactNumber}</Text>
              <Text>Date: {new Date(order.date).toLocaleDateString()}</Text>
              <Text>Status: {order.status}</Text>
              <ProductsContainer>
                {order.products.map((item, index) => (
                  <Text key={index}>
                    {item.quantity} x {item.product.name}
                  </Text>
                ))}
              </ProductsContainer>
            </Card>
          ))}
        </Content>
      </ScrollViewContainer>
    </BackgroundContainer>
  );
};

export default OrderHistory;