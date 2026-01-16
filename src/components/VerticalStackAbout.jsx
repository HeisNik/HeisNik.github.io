import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const AnimatedTitle = styled(motion.h2)`
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.8;
  margin-bottom: 20px;
  
  /* DESKTOP (oletus) */
  font-size: clamp(3rem, 8vw, 6rem);

  /* MOBIILI: Pienennetään reilusti ja lisätään happea */
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    line-height: 1.1;
    margin-bottom: 15px;
  }
`;

const MainSection = styled.section`
  position: relative;
  height: 400vh; 
  background: #000;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const ScreenLayer = styled(motion.div)`
  position: absolute;
  inset: 0; 
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Palautetaan looginen z-index: uudempi kerros on korkeammalla */
  z-index: ${props => props.$depth + 1};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 clamp(20px, 8vw, 10vw);
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Layer = ({ index, screen, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;

  // 1. Animoidaan pelkkää NUMEROA (100 -> 0)
  // Ensimmäinen kerros (0) on aina auki (0%), muut aloittavat 100% (piilossa).
  const clipValue = useTransform(
    progress,
    [start, end],
    index === 0 ? [0, 0] : [100, 0]
  );

  // 2. Pehmennetään numeron liikettä springillä
  const smoothClip = useSpring(clipValue, { 
    stiffness: 40, 
    damping: 18,
    restDelta: 0.001 
  });

  // 3. Muutetaan numero merkkijonoksi vasta tässä (TÄMÄ ON SE KORJAUS)
  const clipPath = useMotionTemplate`inset(${smoothClip}% 0% 0% 0%)`;

  // Tekstianimaatiot
  const titleOpacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const titleY = useTransform(progress, [start, start + 0.1], [50, 0]);
  const textOpacity = useTransform(progress, [start + 0.05, start + 0.15], [0, 0.9]);

  return (
    <ScreenLayer 
      $depth={index} 
      style={{ 
        clipPath: clipPath, 
        backgroundColor: screen.bgColor,
      }}
    >
      <ContentContainer>
      <AnimatedTitle 
  style={{ 
    color: screen.textColor, 
    opacity: titleOpacity,
    y: titleY,
  }}
>
  {screen.title}
</AnimatedTitle>
        
        <motion.p 
          style={{ 
            color: screen.textColor, 
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
            maxWidth: '1000px',
            lineHeight: 1.2,
            fontWeight: 500,
            opacity: textOpacity
          }}
        >
          {screen.text}
        </motion.p>
      </ContentContainer>
    </ScreenLayer>
  );
};

const VerticalStackAbout = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const screens = [
    {
      title: "Who is Niko?",
      text: "ICT student laser-focused on Full-Stack Development and Cybersecurity. Building secure, performant apps is the core of what I do.",
      bgColor: "#dfff00", 
      textColor: "#000" 
    },
    {
      title: "The Developer",
      text: "React, Node.js, and Java Spring for front-to-back delivery. From MongoDB to PostgreSQL, I design data that stays consistent and fast.",
      bgColor: "turquoise",
      textColor: "#000"
    },
    {
      title: "The Cyber Enthusiast",
      text: "Ethical hacking and red team mindset with Kali Linux tooling. Continuously sharpening reconnaissance and exploitation skills.",
      bgColor: "#f87171",
      textColor: "#000"
    }
  ];

  return (
    <MainSection ref={containerRef} id="about">
      <StickyWrapper>
        {screens.map((screen, index) => (
          <Layer 
            key={index} 
            index={index} 
            screen={screen} 
            total={screens.length} 
            progress={scrollYProgress} 
          />
        ))}
      </StickyWrapper>
    </MainSection>
  );
};

Layer.propTypes = {
  index: PropTypes.number.isRequired,
  screen: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }).isRequired,
  total: PropTypes.number.isRequired,
  progress: PropTypes.object.isRequired,
};

export default VerticalStackAbout;
