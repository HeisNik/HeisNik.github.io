import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

// --- STYLED COMPONENTS ---

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Glassmorphism */
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(64, 224, 208, 0.1);
  transition: all 0.3s ease;

  &.scrolled {
    height: 60px;
    background: rgba(0, 0, 0, 0.9);
    border-bottom: 1px solid turquoise;
  }
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  font-family: monospace;
  font-weight: 900;
  font-size: 1.2rem;
  color: white;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
  
  span {
    color: turquoise;
    text-shadow: 0 0 10px turquoise;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: monospace;
  color: #888;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &.active {
    color: turquoise;
  }

  &:hover {
    color: white;
    text-shadow: 0 0 8px white;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: turquoise;
    transition: width 0.3s;
  }

  &.active::after,
  &:hover::after {
    width: 100%;
  }
`;

const MobileToggle = styled.div`
  display: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const FullscreenMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: black;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  /* Binääritausta-efekti menuun */
  background-image: linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), 
                    url("https://grainy-gradients.vercel.app/noise.svg");
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: turquoise;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
    color: white;
  }
`;

// --- PÄÄKOMPONENTTI ---

const navItems = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Connect', to: 'contact' }
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav className={scrolled ? 'scrolled' : ''}>
        <NavContainer>
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            NIKO_<span>HEISKANEN</span>
          </Logo>

          <NavItems>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="active"
              >
                {item.name}
              </NavLink>
            ))}
          </NavItems>

          <MobileToggle onClick={() => setIsOpen(true)}>
            <HiMenuAlt3 />
          </MobileToggle>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <FullscreenMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <IconButton 
              style={{ position: 'absolute', top: 20, right: 20 }}
              onClick={() => setIsOpen(false)}
            >
              <HiX size={40} />
            </IconButton>

            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'turquoise';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'white';
                  }}
                >
                  <span style={{ color: 'turquoise' }}>0{i+1}.</span> {item.name}
                </Link>
              </motion.div>
            ))}
          </FullscreenMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
