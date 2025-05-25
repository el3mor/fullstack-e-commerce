import { axiosInstance } from '@/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { toaster } from '@/components/ui/toaster';
import CookieServices from '@/classes/CookieServices';

interface IInitialState {
  loading: boolean;
  data: ILoginResponse | null;
  error: string | null;
}
interface Inputs {
  identifier: string;
  password: string;
}
interface ILoginResponse {
  jwt: string;

  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface IErrorResponse {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const userLogin = createAsyncThunk('login/userLogin', async (postData: Inputs, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await axiosInstance.post('/auth/local', postData);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state: IInitialState) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state: IInitialState, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      CookieServices.set('jwt', action.payload.jwt);
      CookieServices.set('user', action.payload.user);

      toaster.create({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        duration: 2000,
        type: 'success',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
    builder.addCase(userLogin.rejected, (state: IInitialState, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload as string;
      toaster.create({
        title: (action.payload as IErrorResponse).response.data.error.message,
        duration: 2000,
        type: 'error',
      });
    });
  },
});

export const selectLogin = ({ login }: RootState) => login;
export default loginSlice.reducer;
