import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  measurementId: string
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', measurementId)

    return () => {
      // Cleanup: remove script on unmount
      const scripts = document.querySelectorAll(`script[src*="${measurementId}"]`)
      scripts.forEach(s => s.remove())
    }
  }, [measurementId])

  return null
}

export default GoogleAnalytics

