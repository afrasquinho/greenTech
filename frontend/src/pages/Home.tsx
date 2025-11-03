import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Clients from '../components/Clients'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import UseCases from '../components/UseCases'
import TechStack from '../components/TechStack'
import Process from '../components/Process'
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
      <Clients />
      <Services />
      <WhyChooseUs />
      <UseCases />
      <TechStack />
      <Process />
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

