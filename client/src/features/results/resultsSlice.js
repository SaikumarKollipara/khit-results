import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: {},
  isLoading: false,
  currentSemester: {},
  screenType: '',
  activeTab: 'overview'
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setStudent: (state, action) => { state.student = action.payload },
    startLoading: (state) => { state.isLoading = true },
    stopLoading: (state) => { state.isLoading = false },
    setCurrentSemester: (state, action) => { state.currentSemester = action.payload },
    setScreenType: (state, action) => { state.screenType = action.payload },
    setActiveTab: (state, action) => { state.activeTab = action.payload },
  }
});

export default resultsSlice.reducer;
export const { 
  setStudent, 
  startLoading, 
  stopLoading, 
  setCurrentSemester,
  setScreenType,
  setActiveTab
} = resultsSlice.actions;