import { axiosInstance } from '@/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { toaster } from '@/components/ui/toaster';

interface IInitialState {
  loading: boolean;
  data: IRegisterResponse | null;
  error: string | null;
}
interface Inputs {
  username: string;
  email: string;
  password: string;
}
interface IRegisterResponse {
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

export const userRegister = createAsyncThunk(
  'register/userRegister',
  async (postData: Inputs, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axiosInstance.post('/auth/local/register', postData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state: IInitialState) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state: IInitialState, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      toaster.create({
        title: 'Registration Successful',
        description: 'You have been registered successfully',
        type: 'success',
        duration: 2000,
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    });
    builder.addCase(userRegister.rejected, (state: IInitialState, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload as string;
      toaster.create({
        title: 'Registration Failed',
        description: (action.payload as IErrorResponse).response.data.error.message,
        type: 'error',
        duration: 2000,
      });
    });
  },
});

export const selectRegister = ({ register }: RootState) => register;
export default registerSlice.reducer;
