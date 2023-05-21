import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import ResultsRoutes from './features/results/resultsRoutes';
import Footer from './components/Footer';
import UploadRoutes from './features/upload/uploadRoutes';
import Loading from './components/Loading';
import { setScreenType } from './features/results/resultsSlice';

export default function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(store => store.results );
  const isLargeScreen = useMediaQuery({ minWidth: 1151 });
  const isMediumScreen = useMediaQuery({ minWidth: 601, maxWidth: 1150 });
  const isSmallScreen = useMediaQuery({ maxWidth: 600 });
  if (isLargeScreen) dispatch(setScreenType('large'));
  else if (isMediumScreen) dispatch(setScreenType('medium'));
  else if (isSmallScreen) dispatch(setScreenType('small'));
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <ResultsRoutes />
      <UploadRoutes />
      <ToastContainer hideProgressBar={true} autoClose={1300} position='top-center' />
      {isLoading && <Loading />}
      <Footer />
    </Router>
  )
}
