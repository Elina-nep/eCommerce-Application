import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  alertMessage: string;
}

export const clearAlertThunk = createAsyncThunk(
  'alertMessage/clearAlertMessage',
  async () =>
    new Promise<string>((resolve) => setTimeout(() => resolve(''), 3000)),
);

const alertMessageSlice = createSlice({
  name: 'alertMessage',
  initialState: {
    alertMessage: '',
  },
  reducers: {
    changeAlert(state, action: PayloadAction<IInitialState>) {
      state.alertMessage = action.payload.alertMessage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearAlertThunk.fulfilled, (state, action) => {
      state.alertMessage = action.payload;
    });
  },
});

export const { changeAlert } = alertMessageSlice.actions;
export default alertMessageSlice.reducer;
