import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GoogleAnalytics from './components/GoogleAnalytics'
import './App.css'

function App() {
  // Add your Google Analytics Measurement ID here
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

  return (
    <Router>
      {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
