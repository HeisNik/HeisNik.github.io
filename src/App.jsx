import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CyberBackground from './components/CyberBackground'
import VerticalStackAbout from './components/VerticalStackAbout'
import CyberGridToolbox from './components/CyberGridToolbox'
import Preloader from './components/Preloader'
import BackgroundDecor from './components/BackgroundDecor'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* TÄRKEÄÄ: Sisältöä ei edes yritetä piirtää ennen kuin isLoading on false */}
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }} // Hidas feidaus mustasta
        >
          <div className="relative z-10 content-wrapper">
            <NavBar/>
            <Hero/>
            <VerticalStackAbout/>
            <CyberGridToolbox />
            <Projects/>
            <Contact/>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default App;
