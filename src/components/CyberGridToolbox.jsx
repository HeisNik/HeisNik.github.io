import { useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { 
  motion, useScroll, useSpring, useTransform, 
  useVelocity, useMotionTemplate, useReducedMotion
} from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

// --- STYLED COMPONENTS ---

const SectionWrapper = styled.section`
  width: 100%;
  padding: 150px 0;
  background: #000;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(20px, 8vw, 10vw);
`;

const Grid = styled(motion.div)`
  display: grid;
  /* Grid säätyy mobiiliin automaattisesti */
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 2px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  perspective: 1000px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillCell = styled(motion.div)`
  aspect-ratio: 1 / 1;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: crosshair;

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    transition: border 0.3s;
  }
  &:hover:after {
    border: 1px solid rgba(64, 224, 208, 0.3);
  }
`;

const StatusText = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  font-family: monospace;
  font-size: 0.55rem;
  color: ${({ $active }) => ($active ? 'turquoise' : '#333')};
  z-index: 3;
`;

const DecryptOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
`;

const Header = styled.div`
  margin-bottom: 60px;
  
  span {
    color: turquoise;
    font-family: monospace;
    display: block;
    margin-bottom: 10px;
  }
  
  h2 {
    color: white;
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    line-height: 1;
    
    /* DESKTOP: Max 5rem */
    font-size: clamp(2.5rem, 6vw, 5rem);

    /* MOBIILI: Pienennetään reilusti (alle 768px) */
    @media (max-width: 768px) {
      /* 1.8rem on siisti ja riittävän suuri mobiiliin, 10vw hoitaa pehmeän skaalauksen */
      font-size: clamp(1.8rem, 10vw, 2.5rem);
    }
  }
`;

// --- APUKOMPONENTIT ---

const scrambleChars = '!+-_\\|;:.,#';

const ScrambleText = ({ text, duration = 800, trigger }) => {
  const prefersReducedMotion = useReducedMotion();
  const [output, setOutput] = useState(text);
  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    if (!trigger || prefersReducedMotion) {
      setOutput(text);
      return;
    }

    let frame;
    const start = performance.now();
    const scramble = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      const next = chars.map((ch, idx) => {
        if (t >= idx / chars.length) return ch;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      });
      setOutput(next.join(''));
      if (t < 1) frame = requestAnimationFrame(scramble);
    };
    frame = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frame);
  }, [trigger, duration, chars, text, prefersReducedMotion]);

  return <span aria-hidden="true">{output}</span>;
};

ScrambleText.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trigger: PropTypes.bool.isRequired,
};

// --- PÄÄKOMPONENTIT ---

const SkillItem = ({ skill, velocity, globalTick }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Kortti menee "lukkoon" jos se ei ole hoveroitu JA globaali sykli osuu kohdalle
  // Käytetään arpaa (Math.random), jotta kaikki kortit eivät lukitu kerralla
  const [isLocked, setIsLocked] = useState(true);

  // Velocity-pohjaiset efektit (RGB-glitch ja blur) - säilytetään scroll-efektit
  const shift = useTransform(velocity, [-1, 1], [-15, 15]);
  const shiftNeg = useTransform(shift, (s) => -s);
  const glitchOpacity = useTransform(velocity, [-1, 0, 1], [0.5, 0, 0.5]);
  const blurValue = useTransform(velocity, [-1, 0, 1], [4, 0, 4]);
  const blurFilter = useMotionTemplate`blur(${blurValue}px)`;

  // Reagoidaan globaaliin sykliin
  useEffect(() => {
    if (!isHovered) {
      let unlockTimeout;
      // Satunnainen viive ennen lukitusta luo "yksitellen vaihtuvat kirjaimet" -efektin
      const timeout = setTimeout(() => {
        setIsLocked(true);
        // Automaattinen "unlock" hetken päästä
        unlockTimeout = setTimeout(() => setIsLocked(false), 2000);
      }, Math.random() * 1000);
      
      return () => {
        clearTimeout(timeout);
        if (unlockTimeout) clearTimeout(unlockTimeout);
      };
    }
  }, [globalTick, isHovered]);

  return (
    <SkillCell
      onMouseEnter={() => { setIsHovered(true); setIsLocked(false); }}
      onMouseLeave={() => setIsHovered(false)}
      style={{ filter: blurFilter }}
    >
      <StatusText $active={!isLocked}>
        {isLocked ? '[ENCRYPTING...]' : isHovered ? '[DECRYPTED]' : '[SECURE]'}
      </StatusText>

      {/* Musta peittoefekti (Lentokenttä-taulu) */}
      <DecryptOverlay
        animate={{
          opacity: isLocked ? 1 : 0,
          y: isLocked ? 0 : -20, // Liukuu pois päältä
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <span style={{ color: '#222', fontSize: '1.2rem', fontFamily: 'monospace' }}>
          <ScrambleText text="#####" trigger={isLocked} duration={1500} />
        </span>
      </DecryptOverlay>

      {/* RGB Ghost efektit skrollatessa */}
      <motion.div style={{ position: 'absolute', x: shift, opacity: glitchOpacity, color: '#ff4081', zIndex: 1 }}>
        <skill.Icon size={50} />
      </motion.div>
      <motion.div style={{ position: 'absolute', x: shiftNeg, opacity: glitchOpacity, color: '#00ffff', zIndex: 1 }}>
        <skill.Icon size={50} />
      </motion.div>

      <motion.div
        animate={{
          scale: isLocked ? 0.8 : (isHovered ? 1.1 : 1),
          opacity: isLocked ? 0 : 1,
          filter: isLocked ? 'blur(10px)' : (isHovered ? 'hue-rotate(90deg)' : 'none')
        }}
        style={{ zIndex: 1 }}
      >
        <skill.Icon size={50} color={isHovered ? 'turquoise' : skill.color} />
      </motion.div>

      <motion.p
        style={{
          marginTop: '12px',
          color: 'white',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          zIndex: 1,
        }}
        animate={{ opacity: isLocked ? 0 : 1 }}
      >
        <ScrambleText text={skill.name} trigger={!isLocked} />
      </motion.p>
    </SkillCell>
  );
};

SkillItem.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
  }).isRequired,
  velocity: PropTypes.any.isRequired,
  globalTick: PropTypes.number.isRequired,
};

const skills = [
  { name: 'React', Icon: FaReact, color: '#61dafb' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#68a063' },
  { name: 'Python', Icon: FaPython, color: '#336791' },
  { name: 'PostgreSQL', Icon: BiLogoPostgresql, color: '#336791' },
  { name: 'MongoDB', Icon: BiLogoMongodb, color: '#68a063' },
  { name: 'GraphQL', Icon: GrGraphQl, color: '#e10098' },
  { name: 'Docker', Icon: FaDocker, color: '#0077B5' },
  { name: 'Java Spring', Icon: SiSpring, color: '#68a063' },
  { name: 'Render', Icon: SiRender, color: '#ffffff' },
  { name: 'Azure', Icon: VscAzure, color: '#0077B5' },
  { name: 'Kali Linux', Icon: SiKalilinux, color: '#00adef' },
];

const CyberGridToolbox = ({ skills: customSkills }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });

  // Gridin vääntyminen skrollatessa
  const skewX = useTransform(smoothVelocity, [-1, 1], [-12, 12]);
  const rotateY = useTransform(smoothVelocity, [-1, 1], [-8, 8]);

  // Globaali sykli joka pakottaa kortit satunnaisesti takaisin "lukittuun" tilaan
  const [globalTick, setGlobalTick] = useState(0);

  // Luodaan globaali "syke" joka 8. sekunti
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTick(prev => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const skillsToUse = customSkills || skills;

  return (
    <SectionWrapper ref={targetRef} id="skills">
      <InnerWrapper>
        <Header>
          <motion.span>
            <ScrambleText text="// RECONNAISSANCE_LOG: REVEALING_CORE_STACK" trigger={true} />
          </motion.span>
          <h2>TOOLBOX</h2>
        </Header>

        <Grid style={{ skewX, rotateY }}>
          {skillsToUse.map((skill, index) => (
            <SkillItem 
              key={index} 
              skill={skill} 
              velocity={smoothVelocity} 
              globalTick={globalTick}
            />
          ))}
        </Grid>
      </InnerWrapper>
    </SectionWrapper>
  );
};

CyberGridToolbox.propTypes = {
  skills: PropTypes.array,
};

export default CyberGridToolbox;

