import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../Home';
import {
  fetchProducts,
  fetchCartItems,
  clearCart,
  addToCart,
  removeFromCart,
} from '../../../database/ListingAndCart';
import { fetchOrderHistory } from '../../../database/orders';
import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../../../redux/reducers';

jest.mock('../../../database/orders', () => ({
  fetchOrderHistory: jest.fn(),
  createOrderTables: jest.fn(), // Add this line to mock createOrderTables
}));

jest.mock('../../../database/ListingAndCart', () => ({
  fetchProducts: jest.fn(),
  fetchCartItems: jest.fn(),
  clearCart: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  getTotalCartItems: jest.fn(),
  createCartTable: jest.fn(), // Add this line to mock createCartTable
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useFocusEffect: jest.fn(cb => cb()),
}));

const mockStore = createStore(rootReducer);

describe('Home Screen', () => {
  const initialState = {
    UserReducer: {
      data: {
        id: 1,
        fullName: 'John Doe',
      },
    },
  };

  beforeEach(() => {
    // Mock the products and cart items
    fetchProducts.mockResolvedValue([
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        available_in: ['Delhi'],
        image_path: 'product1',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200,
        available_in: ['Mumbai'],
        image_path: 'product2',
      },
    ]);
    fetchCartItems.mockResolvedValue([{ id: 1, quantity: 2 }]);
    fetchOrderHistory.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the home screen with products and cart', async () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={mockStore}>
        <Home />
      </Provider>,
    );

    // Check if the home screen is rendered
    expect(getByTestId('home-screen')).toBeTruthy();

    // Wait for products to load and check if they are displayed
    await waitFor(() => expect(getAllByTestId(/product-/)).toHaveLength(3));

    // Check if product details are displayed correctly
    expect(getByTestId('name-1').props.children).toBe('Product 1');

    expect(getByTestId('price-1').props.children[1]).toBe(100);
  });

  it('should allow adding and removing products from the cart', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Home />
      </Provider>,
    );

    // Wait for products to load
    await waitFor(() => expect(getByTestId('increase-1')).toBeTruthy());

    // Simulate adding a product to the cart
    fireEvent.press(getByTestId('increase-1'));
    await waitFor(() => expect(addToCart).toHaveBeenCalledWith(undefined, 1));

    // Simulate removing a product from the cart
    fireEvent.press(getByTestId('decrease-1'));
    await waitFor(() =>
      expect(removeFromCart).toHaveBeenCalledWith(undefined, 1),
    );
  });
});
