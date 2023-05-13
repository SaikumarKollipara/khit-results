import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: {},
  isLoading: false
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setStudent: (state, action) => { state.student = action.payload },
    startLoading: (state) => state.isLoading = true,
    stopLoading: (state) => state.isLoading = true
  }
});

export default resultsSlice.reducer;
export const { setStudent, startLoading, stopLoading } = resultsSlice.actions;