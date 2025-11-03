import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import TechStack from '../components/TechStack'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ChatBotWidget from '../components/ChatBotWidget'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <About />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <ChatBotWidget />
    </div>
  )
}

export default Home

