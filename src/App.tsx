import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Calculator } from './components/Calculator'
import { HowItWorks } from './components/HowItWorks'
import { Requirements } from './components/Requirements'
import { Audience } from './components/Audience'
import { Footer } from './components/Footer'
import { CookieBanner } from './components/CookieBanner'
import { PrivacyPolicyPage } from './components/legal/PrivacyPolicyPage'
import { TermsPage } from './components/legal/TermsPage'

type Route = 'home' | 'privacy' | 'terms'

function getRoute(hash: string): Route {
  if (hash === '#/privacy-policy') return 'privacy'
  if (hash === '#/terms') return 'terms'
  return 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRoute(window.location.hash))

  useEffect(() => {
    function onHashChange() {
      setRoute(getRoute(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    // Legal pages always open at the top. On the home route, honor an
    // in-page anchor (e.g. clicking "Калькулятор" while on a legal page
    // fires a hashchange before React re-renders the target section, so
    // the browser's own anchor scroll has nothing to land on yet).
    if (route === 'home') {
      const hash = window.location.hash
      if (hash && hash !== '#') {
        document.querySelector(hash)?.scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [route])

  return (
    <div className="min-h-screen bg-paper transition-colors duration-300">
      <Header />
      <main>
        {route === 'privacy' && <PrivacyPolicyPage />}
        {route === 'terms' && <TermsPage />}
        {route === 'home' && (
          <>
            <Calculator />
            <HowItWorks />
            <Requirements />
            <Audience />
          </>
        )}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

export default App
