import Home from './pages/Home'
import GoogleAnalytics from './components/GoogleAnalytics'

function App() {
  // Add your Google Analytics Measurement ID here
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

  return (
    <>
      {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
      <Home />
    </>
  )
}

export default App
