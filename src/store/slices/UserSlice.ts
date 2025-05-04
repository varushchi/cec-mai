// store/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../schemas/UserSchema'

interface UserState {
  user: User | null
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
      state.loading = false
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: User, { dispatch }) => {
    dispatch(loginStart())
    try {
      const user = await {user: credentials}
      dispatch(loginSuccess(user))
    } catch (error) {
      dispatch(loginFailure(error))
    }
  }
)

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;