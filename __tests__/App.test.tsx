import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; // Adjust the path according to your folder structure
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Route from '../src/navigation';

// Mock the necessary modules
jest.mock('../src/navigation', () => jest.fn(() => null)); // Mock Route component
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  Provider: jest.fn(({ children }) => children), // Mock Redux Provider
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: jest.fn(({ children }) => children), // Mock NavigationContainer
}));

describe('App Component', () => {
  it('should render the App component correctly', () => {
    const {} = render(<App />);

    // Verify that the NavigationContainer is rendered
    expect(NavigationContainer).toHaveBeenCalled();

    // Verify that the Provider is rendered
    expect(Provider).toHaveBeenCalled();

    // Verify that the Route component is rendered
    expect(Route).toHaveBeenCalled();
  });
});
