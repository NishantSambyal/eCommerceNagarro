import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // Import useDispatch
import Login from '../Login'; // Adjust the path if necessary
import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../../../redux/reducers';
import { loginUser } from '../../../database/authentication';
import { loginUserR } from '../../../redux/reducers/slices/userSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../../database/authentication', () => ({
  loginUser: jest.fn(), // Mock loginUser here
}));

describe('Login Component', () => {
  const mockStore = createStore(rootReducer);
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
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('handles successful login', async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ id: 1, name: 'Nishant' });

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.changeText(getByTestId('email-input'), 'nishant@gmail.com');
    fireEvent.changeText(getByTestId('password-input'), 'password');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('nishant@gmail.com', 'password');
    });
  });

  it('logs in successfully with valid credentials', async () => {
    const mockUserDetails = {
      id: 1,
      name: 'Nishant',
      email: 'nishant@gmail.com',
    };
    (loginUser as jest.Mock).mockResolvedValue(mockUserDetails);
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>,
    );

    // Simulate user entering email and password
    fireEvent.changeText(getByTestId('email-input'), 'nishant@gmail.com');
    fireEvent.changeText(getByTestId('password-input'), 'password');

    // Simulate pressing the login button
    fireEvent.press(getByTestId('login-button'));

    // Wait for the login process to complete
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('nishant@gmail.com', 'password');
      expect(dispatch).toHaveBeenCalledWith(loginUserR(mockUserDetails));
    });
  });
});
