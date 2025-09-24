import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';

const ScrollContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  min-height: calc(100vh - 120px);
`;

const Box = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 10px;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const Icon = styled.span`
  margin-right: 15px;
  font-size: 24px;
  color: #666;
  min-width: 30px;
  text-align: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  color: #333;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 0;
  }
`;

const Button = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  padding: 15px 30px;
  background-color: #28a745;
  border-radius: 50px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    right: 20px;
    bottom: 20px;
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCart();
  const { addOrder } = useOrders();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleOrder = () => {
    if (!name || !address || !contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Create order for each cart item
    cart.forEach(item => {
      const orderData = {
        name,
        address,
        contactNumber,
        product: `${item.brand} ${item.weight}`,
        quantity: item.quantity,
        price: item.price,
        total: parseFloat(item.price.replace('₱', '')) * item.quantity
      };
      addOrder(orderData);
    });

    // Clear the cart
    clearCart();

    alert('Order placed successfully!');
    // Navigate back to customer home after placing order
    navigate('/customer-home');
  };

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading" />
      <ScrollContent>
        <Box>
          <Card>
            <Icon>👤</Icon>
            <Input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Card>
          <Card>
            <Icon>📍</Icon>
            <Input
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </Card>
          <Card>
            <Icon>📞</Icon>
            <Input
              placeholder="Contact Number"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              type="tel"
              required
            />
          </Card>

          {/* Order Summary */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderRadius: '8px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
                fontSize: '14px'
              }}>
                <span>{item.brand} {item.weight} x{item.quantity}</span>
                <span>₱{parseFloat(item.price.replace('₱', '')) * item.quantity}</span>
              </div>
            ))}
            <div style={{
              borderTop: '1px solid #007bff',
              marginTop: '10px',
              paddingTop: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#007bff'
            }}>
              Total: ₱{getCartTotal().toFixed(2)}
            </div>
          </div>
        </Box>
      </ScrollContent>
      <Button onClick={handleOrder}>Place Order</Button>
    </BackgroundContainer>
  );
};

export default Checkout;