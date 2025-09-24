import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';
import { useCart } from '../contexts/CartContext';

const Content = styled.div`
  flex: 1;
  max-width: 800px;
  width: 90%;
  margin: 20px auto;
  background-color: rgba(20, 19, 14, 0.6);
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;

const FlatListContainer = styled.div`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ddd;
  min-height: 400px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Item = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  position: relative;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const QuantityInput = styled.input`
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 8px;
  width: 70px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 60px;
    padding: 6px;
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-family: 'Freeman', sans-serif;
  color: #201c1c;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PriceText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #28a745;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const HeaderButton = styled.button`
  margin-left: 10px;
  padding: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  font-family: 'JosefinSans', sans-serif;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0 5px;
  }
`;

const CheckoutButton = styled.button`
  align-self: center;
  width: 300px;
  background-color: #28a745;
  padding: 15px 30px;
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    width: 250px;
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemCount } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, parseInt(newQuantity) || 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading">
        <HeaderButton onClick={() => navigate('/customer-home')}>Home</HeaderButton>
        <HeaderButton onClick={() => navigate('/order-history')}>Orders</HeaderButton>
        <HeaderButton onClick={() => navigate('/user-profile')}>Profile</HeaderButton>
        <HeaderButton onClick={() => navigate('/login')}>Logout</HeaderButton>
      </Header>
      <Content>
        <FlatListContainer>
          <List>
            {cart.length === 0 ? (
              <Text style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
                Your cart is empty
              </Text>
            ) : (
              cart.map(item => (
                <ItemContainer key={item.id}>
                  <Item>
                    <ItemInfo>
                      <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        {item.brand} - {item.weight}
                      </Text>
                      <PriceText>₱{parseFloat(item.price.replace('₱', '')) * item.quantity}</PriceText>
                    </ItemInfo>
                    <ItemControls>
                      <label>
                        <span style={{ marginRight: '8px', fontSize: '14px' }}>Qty:</span>
                        <QuantityInput
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                      </label>
                      <DeleteButton onClick={() => removeFromCart(item.id)}>×</DeleteButton>
                    </ItemControls>
                  </Item>
                </ItemContainer>
              ))
            )}
          </List>
          {cart.length > 0 && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                Total: ₱{getCartTotal().toFixed(2)}
              </Text>
            </div>
          )}
        </FlatListContainer>
        <CheckoutButton onClick={handleCheckout}>
          Checkout ({getCartItemCount()} items)
        </CheckoutButton>
      </Content>
    </BackgroundContainer>
  );
};

export default Cart;