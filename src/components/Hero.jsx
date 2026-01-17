import { useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroInner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 120px clamp(1.5rem, 5vw, 6vw) 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: clamp(20px, 5vw, 80px);
  width: 100%;

  @media (max-width: 1140px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  min-width: 0;
  z-index: 2;

  h1 {
    font-size: clamp(1.2rem, 4.5vw, 3.2rem);
    line-height: 1.1;
    color: white;
    white-space: normal;
    word-break: keep-all;

    @media (max-width: 1140px) {
      text-align: center;
      font-size: clamp(1.1rem, 8vw, 2.5rem);
    }
  }
`;

const RoleLine = styled.div`
  color: ${props => props.$color || 'turquoise'} !important;
  display: block;
  white-space: normal;
  word-wrap: break-word;
  overflow: visible;
  min-height: 3.6em;
  line-height: 1.2em;
  
  @media (min-width: 1141px) {
    min-height: 4.4em;
  }

  margin: 0;
  padding: 0;
  
  .Typewriter {
    display: inline;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 0 1 400px;
  position: relative;
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    inset: -10px;
    border: 1px solid rgba(64, 224, 208, 0.3);
    border-radius: 25px;
    z-index: -1;
  }

  @media (max-width: 900px) {
    flex: 0 1 280px;
  }
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  filter: grayscale(20%) contrast(110%);

  @media (max-width: 900px) {
    max-width: 280px;
  }
`;

const StatusBadge = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: turquoise;
  color: black;
  padding: 10px;
  font-family: monospace;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(64, 224, 208, 0.4);

  @media (max-width: 900px) {
    font-size: 0.6rem;
    padding: 8px;
    bottom: -15px;
    right: -15px;
  }
`;

const roles = [
  { text: 'Full Stack Developer', color: 'turquoise' }, // Sama kuin About-osion "The Developer"
  { text: 'Cyber Security Enthusiast', color: '#f87171' }, // Sama kuin About-osion "The Cyber Enthusiast"
  { text: 'ICT Student & Innovator', color: '#dfff00' }  // Sama kuin About-osion "Who is Niko?"
];

const Hero = () => {
  const [roleColor, setRoleColor] = useState(roles[0].color);
  const { scrollY } = useScroll();

  // SKROLLAUS-EFEKTIT: Elementit erkanevat sivuille skrollatessa
  const textX = useTransform(scrollY, [0, 500], [0, -200]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const imageX = useTransform(scrollY, [0, 500], [0, 200]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <HeroSection id="hero">
      <HeroInner>
        <HeroContent 
          style={{ x: textX, opacity: textOpacity }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1>
            I&apos;M NIKO HEISKANEN
            <RoleLine $color={roleColor}>
              <Typewriter
                onInit={(typewriter) => {
                  const loopRoles = () => {
                    roles.forEach(({ text, color }) => {
                      typewriter
                        .callFunction(() => setRoleColor(color))
                        .typeString(text)
                        .pauseFor(1500)
                        .deleteAll(30);
                    });
                    typewriter.callFunction(loopRoles);
                  };
                  loopRoles();
                  typewriter.start();
                }}
                options={{ loop: true, delay: 50 }}
              />
            </RoleLine>
          </h1>
        </HeroContent>

        <ImageContainer
          style={{ x: imageX, scale: imageScale, opacity: imageOpacity }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <HeroImage 
            src="/images/IMG_9916.jpg" 
            alt="Niko Heiskanen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          />
          
          {/* Kelluva koriste-elementti */}
          <StatusBadge
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            STATUS: ACTIVE
          </StatusBadge>
        </ImageContainer>
      </HeroInner>
    </HeroSection>
  );
}

export default Hero;

/*
const Hero = () => {
    return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
    <h1 style={{color: "turquoise",width: "80%", maxWidth: "600px", margin: "0 auto", padding: "5px"} }> <b  style={{color: "white"}}>I'm Niko Heiskanen</b> full stack developer <b style={{color:"white"}}>and</b> <b style={{color: "red"}}>cyber security enthusiast</b></h1>
    <img style={{width:"400px"}} src={`/images/IMG_9916.jpg`} alt="Description" />
    </div>
)}
*/