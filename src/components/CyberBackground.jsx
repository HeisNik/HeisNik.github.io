import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

// Aggressiivisempi muodonmuutos
const plasmaWarp = keyframes`
  0% { transform: translate(0, 0) rotate(0deg) scale(1); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  33% { transform: translate(10%, -10%) rotate(120deg) scale(1.2); border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
  66% { transform: translate(-5%, 15%) rotate(240deg) scale(0.8); border-radius: 20% 80% 30% 70% / 60% 30% 70% 40%; }
  100% { transform: translate(0, 0) rotate(360deg) scale(1); border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: #000;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const AuroraContainer = styled.div`
  position: absolute;
  inset: -20%;
  filter: blur(80px); /* Hieman terävämpi kuin aiemmin -> enemmän energiaa */
  opacity: 0.7; /* Nostettu opasiteetti */
`;

const AuroraBlob = styled(motion.div)`
  position: absolute;
  width: 120vw;
  height: 100vh;
  background: ${props => props.$color};
  animation: ${plasmaWarp} ${props => props.$duration}s infinite linear;
  mix-blend-mode: overlay; /* Värit "purevat" toisiinsa aggressiivisemmin */
`;

const SpotlightGrid = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(7, 234, 230, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(7, 234, 230, 0.4) 1px, transparent 1px);
  background-size: 40px 40px; /* Tiheämpi gridi tuntuu teknisemmältä */
  z-index: 2;
`;

const CyberBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Napakampi fysiikka (vähemmän dampingia = nopeampi reaktio)
  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spotlightMask = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)`
  );

  return (
    <BackgroundContainer>
      <AuroraContainer>
      <AuroraBlob 
          $color="radial-gradient(circle, #07eae6 0%, transparent 70%)" 
          $duration={12} /* Nopeutettu */
          style={{ top: '-10%', left: '-20%' }}
        />
        <AuroraBlob 
          $color="radial-gradient(circle, #ff0066 0%, transparent 70%)" 
          $duration={15}
          style={{ bottom: '-20%', right: '-10%' }}
        />
        <AuroraBlob 
          $color="radial-gradient(circle, #7000ff 0%, transparent 70%)" 
          $duration={10}
          style={{ top: '20%', left: '30%', opacity: 0.5 }}
        />
      </AuroraContainer>

      <SpotlightGrid 
        style={{ 
          WebkitMaskImage: spotlightMask,
          maskImage: spotlightMask,
          opacity: 1
        }} 
      />

      {/* Noise-tekstuuri on tässä "aggressiivisuuden" avain */}
      <div style={{
        position: 'absolute',
        inset: -100,
        opacity: 0.06,
        backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 3
      }} />
    </BackgroundContainer>
  );
};

export default CyberBackground;

