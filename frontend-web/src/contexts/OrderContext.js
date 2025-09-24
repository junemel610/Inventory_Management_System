import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      _id: Date.now().toString(),
      ref_no: `REF${Date.now()}`,
      customerName: orderData.name,
      customerAddress: orderData.address,
      contactNumber: orderData.contactNumber,
      products: [{
        quantity: orderData.quantity,
        product: {
          name: orderData.product,
          price: orderData.price || '₱0'
        }
      }],
      date: new Date().toISOString(),
      status: 'Pending',
      total: orderData.total || 0
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  };

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'Pending');
  };

  const getCompletedOrders = () => {
    return orders.filter(order => order.status !== 'Pending');
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getPendingOrders,
    getCompletedOrders,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};