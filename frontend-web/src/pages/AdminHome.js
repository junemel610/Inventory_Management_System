import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundContainer from '../components/BackgroundContainer';
import { useOrders } from '../contexts/OrderContext';
import tanks from '../data';

const Content = styled.div`
  align-items: center;
  padding: 20px 0;
`;

const SectionTitleContainer = styled.div`
  align-content: center;
  padding: 10px 20px;
  background-color: black;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 15px;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Brand = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
`;

const Weight = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  color: #666;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

const AddButton = styled.button`
  background-color: #28a745;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
`;

const ModalContainer = styled.div`
  justify-content: center;
  align-items: center;
  background-color: papayawhip;
  width: 700px;
  height: 400px;
  align-self: center;
  margin: 120px auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Input = styled.input`
  border: 3px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 25%;
  margin-bottom: 20px;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 30px;
  gap: 20px;
`;

const ModalButton = styled.button`
  background-color: #E95D23;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  color: black;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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

const AdminHome = () => {
  const [products, setProducts] = useState(tanks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ brand: '', weight: '', image: null });
  const { getPendingOrders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();

  const pendingOrders = getPendingOrders();

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const addNewProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    toggleModal();
    setNewProduct({ brand: '', weight: '', image: null });
  };

  return (
    <BackgroundContainer>
      <Header title="Vinarao LPG Trading">
        <HeaderButton onClick={() => navigate('/login')}>Logout</HeaderButton>
      </Header>
      <Content>
        <SectionTitleContainer>
          <SectionTitle>Product Listings</SectionTitle>
        </SectionTitleContainer>
        <ProductsContainer>
          {products.map(product => (
            <Card key={product.id}>
              <Brand>{product.brand}</Brand>
              <Weight>Weight: {product.weight}</Weight>
              <DeleteButton onClick={() => deleteProduct(product.id)}>Delete</DeleteButton>
            </Card>
          ))}
          <AddButton onClick={toggleModal}>+</AddButton>
        </ProductsContainer>
        <SectionTitleContainer>
          <SectionTitle>Pending Orders ({pendingOrders.length})</SectionTitle>
        </SectionTitleContainer>
        <div style={{ width: '80%', margin: '0 auto' }}>
          {pendingOrders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '16px' }}>
              No pending orders
            </p>
          ) : (
            pendingOrders.map(order => (
              <div key={order._id} style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                margin: '10px 0',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                      Order #{order.ref_no}
                    </h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Customer:</strong> {order.customerName}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Address:</strong> {order.customerAddress}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Contact:</strong> {order.contactNumber}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                    </p>
                    <div style={{ marginTop: '10px' }}>
                      <strong>Products:</strong>
                      {order.products.map((item, index) => (
                        <div key={index} style={{ marginLeft: '10px', color: '#666' }}>
                          {item.quantity} x {item.product.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Completed')}
                      style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, 'Cancelled')}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Content>

      {isModalVisible && (
        <Modal>
          <ModalContainer>
            <Input
              placeholder="Brand"
              value={newProduct.brand}
              onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
            />
            <Input
              placeholder="Weight"
              value={newProduct.weight}
              onChange={e => setNewProduct({ ...newProduct, weight: e.target.value })}
            />
            <ButtonContainer>
              <ModalButton onClick={toggleModal}>Cancel</ModalButton>
              <ModalButton onClick={addNewProduct}>Add Product</ModalButton>
            </ButtonContainer>
          </ModalContainer>
        </Modal>
      )}
    </BackgroundContainer>
  );
};

export default AdminHome;