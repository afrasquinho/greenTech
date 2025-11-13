import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Blog from './pages/Blog'
import ArticleDetail from './pages/ArticleDetail'
import ArticleEditor from './pages/ArticleEditor'
import AuthCallback from './pages/AuthCallback'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import GoogleAnalytics from './components/GoogleAnalytics'

function App() {
  // Add your Google Analytics Measurement ID here
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

  return (
    <Router>
      {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/articles/new"
          element={
            <AdminRoute>
              <ArticleEditor />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/articles/:id/edit"
          element={
            <AdminRoute>
              <ArticleEditor />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
