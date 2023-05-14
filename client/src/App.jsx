import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResultsRoutes from './features/results/resultsRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <ResultsRoutes /> 
      <ToastContainer hideProgressBar={true} autoClose={1000} position='top-center' />
      <Footer />
    </Router>
  )
}
