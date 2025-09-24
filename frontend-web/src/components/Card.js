import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 340px;
  width: 200px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 300px;
    padding: 10px;
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
  object-fit: contain;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Brand = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
  color: #333;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const QuantityInput = styled.input`
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 8px;
  width: 70px;
  text-align: center;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 60px;
    padding: 6px;
    font-size: 14px;
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const Card = ({ tank, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <CardContainer>
      <ProductImage src={tank.image} alt={tank.brand} />
      <Brand>{tank.brand}</Brand>
      <QuantityInput
        type="number"
        value={quantity}
        onChange={e => setQuantity(parseInt(e.target.value) || 1)}
      />
      <AddButton onClick={() => addToCart(tank, quantity)}>Add to Cart</AddButton>
    </CardContainer>
  );
};

export default Card;