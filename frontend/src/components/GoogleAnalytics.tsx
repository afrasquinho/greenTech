import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (command: string, ...args: (string | number | Date | Record<string, unknown>)[]) => void
    dataLayer: unknown[]
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
    window.gtag = function(...args: (string | number | Date | Record<string, unknown>)[]) {
      window.dataLayer.push(args)
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

