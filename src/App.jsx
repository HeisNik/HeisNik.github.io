import { useState, useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SkillsCarousel from './components/SkillsCarousel'
import ShaderBackground from './components/ShaderBackground'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <ShaderBackground 
        backdropBlurAmount="sm" 
        color="#07eae6ff"
        className="fixed inset-0 z-0"
      />
      <div className="relative z-10 content-wrapper">
        <NavBar/>
        <Hero/>
        <About/>
        <SkillsCarousel isMobile={isMobile} />
        <Projects/>
        <Contact/>
      </div>
    </div>
  )
}

export default App
