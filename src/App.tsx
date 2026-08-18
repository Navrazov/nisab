import { Header } from './components/Header'
import { Calculator } from './components/Calculator'
import { HowItWorks } from './components/HowItWorks'
import { Advantages } from './components/Advantages'
import { Requirements } from './components/Requirements'
import { Audience } from './components/Audience'
import { Faq } from './components/Faq'
import { LegalInfo } from './components/LegalInfo'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-paper transition-colors duration-300">
      <Header />
      <main>
        <Calculator />
        <HowItWorks />
        <Advantages />
        <Requirements />
        <Audience />
        <Faq />
        <LegalInfo />
      </main>
      <Footer />
    </div>
  )
}

export default App
