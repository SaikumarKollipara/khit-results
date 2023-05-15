import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Upload from './Upload';

export default function UploadRoutes() {
  return (
    <Routes>
      <Route path='/upload' element={<Upload />} />
    </Routes>
  )
}
