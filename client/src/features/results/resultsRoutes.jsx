import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllResults from './pages/AllResults';
import SemResults from './pages/SemResults';

export default function ResultsRoutes() {
  return (
    <Routes>
      <Route path='results'>
        <Route path='all/:rollNo' element={<AllResults />} />
        <Route path=':sem/:rollNo' element={<SemResults />} />
      </Route>
    </Routes>
  )
}
