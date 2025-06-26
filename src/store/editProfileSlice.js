import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import updateUser from '../services/updateUser';
import { setUser } from './userSlice';

export const updateProfile = createAsyncThunk(
  'editProfile/updateProfile',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().user.user;
      const response = await updateUser(userData, token);

      dispatch(setUser(response.user));
      return response.user;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update profile');
    }
  }
);

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEditProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEditProfileError } = editProfileSlice.actions;
export default editProfileSlice.reducer;
