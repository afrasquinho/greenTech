import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')
  const provider = searchParams.get('provider')
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error)
      navigate('/?error=oauth_failed')
      return
    }

    if (token) {
      // Store token and user info
      localStorage.setItem('token', token)
      
      // Fetch user profile to store in localStorage
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) {
            localStorage.setItem('user', JSON.stringify(data.user))
            // Trigger page reload to update auth context
            window.location.href = '/dashboard'
          } else {
            navigate('/?error=oauth_failed')
          }
        })
        .catch(err => {
          console.error('Error fetching user profile:', err)
          navigate('/?error=oauth_failed')
        })
    } else {
      navigate('/?error=oauth_failed')
    }
  }, [token, error, provider, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">A processar autenticação...</p>
      </div>
    </div>
  )
}

export default AuthCallback

