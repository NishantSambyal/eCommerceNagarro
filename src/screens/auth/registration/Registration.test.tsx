import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Registration from '../Registration'; // Adjust the path as needed
import { Alert } from 'react-native';
import { registerUser } from '../../../database/authentication';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { myAlertBox } from '../../../utils/alert';
import { useMyNavigation } from '../../../navigation/useMyNavigation';
import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../../../redux/reducers';

jest.mock('../../../navigation/useMyNavigation');
jest.mock('../../../database/authentication');
jest.mock('../../../utils/alert');

describe('Registration Screen', () => {
  const mockStore = createStore(rootReducer);

  const mockNavigate = jest.fn();
  jest.spyOn(Alert, 'alert');

  beforeEach(() => {
    jest.clearAllMocks();
    (useMyNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render the registration screen correctly', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Registration />
        </NavigationContainer>
      </Provider>,
    );
    // const { getByTestId } = render(<Registration />);

    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('confirm-password-input')).toBeTruthy();
    expect(getByTestId('fullname-input')).toBeTruthy();
    expect(getByTestId('register-button')).toBeTruthy();
    expect(getByTestId('new-user-button')).toBeTruthy();
  });

  it('should show an alert if passwords do not match', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Registration />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password456');
    fireEvent.press(getByTestId('register-button'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Passwords do not match');
    });
  });

  it('should call registerUser and navigate to login on successful registration', async () => {
    (registerUser as jest.Mock).mockResolvedValueOnce({});
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Registration />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    fireEvent.changeText(getByTestId('fullname-input'), 'Test User');
    fireEvent.press(getByTestId('register-button'));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith(
        'test@test.com',
        'password123',
        'Test User',
      );
      expect(myAlertBox).toHaveBeenCalledWith({
        title: 'Registration Successful',
        description: 'Registration successful. Please login',
        onPress: expect.any(Function),
      });
    });

    // Simulate the press on the alert box
    const alertCall = myAlertBox.mock.calls[0][0];
    alertCall.onPress();

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('should show an error alert if registration fails', async () => {
    (registerUser as jest.Mock).mockRejectedValueOnce(
      new Error('Registration failed'),
    );
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Registration />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.changeText(getByTestId('email-input'), 'test@test.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.changeText(getByTestId('confirm-password-input'), 'password123');
    fireEvent.changeText(getByTestId('fullname-input'), 'Test User');
    fireEvent.press(getByTestId('register-button'));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith(
        'test@test.com',
        'password123',
        'Test User',
      );
      expect(Alert.alert).toHaveBeenCalledWith(
        'Registration Error:',
        new Error('Registration failed'),
      );
    });
  });

  it('should navigate to login when clicking "Already Registered" button', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Registration />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByTestId('new-user-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
