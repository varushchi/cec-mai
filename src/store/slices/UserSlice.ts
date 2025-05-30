// store/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginPayload, RegisterPayload, LoginSchema, RegisterSchema } from '../schemas/UserSchema'

interface UserState {
  user: User | null
  loading: boolean;
}

const initialState: UserState = {
  user: {
    name: 'Даниил',
    email: 'daniilliguy@mai.education',
    surname: 'Лигай',
    user_id: '1',
    department: '307',
    isAdmin: true
  },
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
    const registerCheck = RegisterSchema.safeParse(credentials).success
    const loginCheck = LoginSchema.safeParse(credentials).success
    const url =
  registerCheck ? 'http://localhost/ppproject/public/api/generate-user-token' :
  loginCheck ? 'http://localhost/ppproject/public/api/login':
  ''

    try {
      const res = await fetch(url, {
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
      } else {
        localStorage.setItem('user_token', data.token)
      }

      dispatch(loginSuccess({user: data.user}))
      

    } catch (error) {
      dispatch(loginFailure())
      return rejectWithValue(error instanceof Error ? error.message : 'Неизвествная ошибка сервера');
    }
  }
);

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;