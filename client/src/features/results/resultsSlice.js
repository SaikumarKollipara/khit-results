import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: {},
  isLoading: false,
  currentSemester: {}
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setStudent: (state, action) => { state.student = action.payload },
    startLoading: (state) => { state.isLoading = true },
    stopLoading: (state) => { state.isLoading = false },
    setCurrentSemester: (state, action) => { state.currentSemester = action.payload },
  }
});

export default resultsSlice.reducer;
export const { setStudent, startLoading, stopLoading, setCurrentSemester } = resultsSlice.actions;