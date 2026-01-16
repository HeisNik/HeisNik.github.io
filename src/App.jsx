import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ShaderBackground from './components/ShaderBackground'
import VerticalStackAbout from './components/VerticalStackAbout'
import CyberGridToolbox from './components/CyberGridToolbox'

function App() {

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
        <VerticalStackAbout/>
        <CyberGridToolbox />
        <Projects/>
        <Contact/>
      </div>
    </div>
  )
}

export default App
