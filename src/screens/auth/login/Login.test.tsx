// src/screens/auth/login/Login.test.tsx
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../../../redux/reducers';
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Login from '../Login'; // Update path as necessary

const mockStore = createStore(rootReducer);

describe('Login Component', () => {
  jest.mock('../../../database/authentication', () => ({
    loginUser: jest.fn(),
  }));
  jest.mock('../../../navigation/useMyNavigation', () => ({
    useMyNavigation: () => ({ navigate: jest.fn() }),
  }));
  jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
  }));
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByTestId('login-button')).toBeTruthy();
  });
});
