// store/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginPayload, RegisterPayload } from '../schemas/UserSchema'

interface UserState {
  user: User | null
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
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
    loginFailure: (state) => {
      state.loading = false
    },
    logout: (state) => {
      state.user = null
    },
  },
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginPayload | RegisterPayload, { rejectWithValue, dispatch }) => {
    dispatch(loginStart())
    try {
      const res = await fetch('http://localhost/ppproject/public/api/generate-user-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        dispatch(loginFailure())
        return rejectWithValue(errorData.message || `HTTP ошибка! статус: ${res.status}`);
      }

      const data = await res.json();
      
      if (!data.token) {
        dispatch(loginFailure())
        return rejectWithValue('Ошибка? Токен не был получен');
        
      }

      return data;
    } catch (error) {
      dispatch(loginFailure())
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвествная ошибка сервера');
    }
  }
);

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;