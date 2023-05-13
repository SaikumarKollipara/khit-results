import { configureStore } from '@reduxjs/toolkit';
import resultsSlice from '../features/results/resultsSlice';

const store = configureStore({
  reducer: {
    results: resultsSlice
  }
});

export default store;