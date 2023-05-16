import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResultsRoutes from './features/results/resultsRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import UploadRoutes from './features/upload/uploadRoutes';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';

export default function App() {
  const { isLoading } = useSelector(store => store.results );
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
