import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  data: any;
}
const initialState: UserState = {
  isLogin: false,
  data: false,
};

// Redux slice
const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    loginUserR: (state: any, action: PayloadAction<any>) => {
      state.isLogin = true;
      state.data = action.payload;
    },
    logoutUserR: () => initialState,
  },
});

export const { loginUserR, logoutUserR } = UserSlice.actions;

export default UserSlice.reducer;
