import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const SkillsSection = styled.section`
  width: 100%;
  padding: 100px 0;
  background: transparent;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(6vw, 8vw, 10vw);
`;

const Header = styled.h1`
  color: turquoise;
  font-size: clamp(3rem, 8vw, 5.5rem);
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SkillCell = styled(motion.div)`
  aspect-ratio: 1 / 1;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: crosshair;
  padding: 20px;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(64, 224, 208, 0);
    transition: border 0.2s;
  }

  &:hover:before {
    border: 1px solid rgba(64, 224, 208, 0.3);
  }
`;

const StatusText = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.6rem;
  color: ${({ $active }) => ($active ? 'turquoise' : '#333')};
  text-transform: uppercase;
`;

const DecryptOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
`;

const scrambleChars = '!+-_\\|;:.,';

const ScrambleText = ({ text, duration = 800, trigger }) => {
  const prefersReducedMotion = useReducedMotion();
  const [output, setOutput] = useState(text);
  const [scrambleKey, setScrambleKey] = useState(0);
  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    if (!trigger || prefersReducedMotion) return undefined;
    const interval = setInterval(() => setScrambleKey((k) => k + 1), 10000);
    return () => clearInterval(interval);
  }, [trigger, prefersReducedMotion]);

  useEffect(() => {
    if (!trigger || prefersReducedMotion) {
      setOutput(text);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const scramble = () => {
      const now = performance.now();
      const t = Math.min(1, (now - start) / duration);
      const next = chars.map((ch, idx) => {
        const ready = t >= idx / chars.length;
        if (ready) return ch;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      });
      setOutput(next.join(''));
      if (t < 1) frame = requestAnimationFrame(scramble);
    };
    frame = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frame);
  }, [trigger, duration, chars, text, prefersReducedMotion, scrambleKey]);

  return <span aria-hidden="true">{output}</span>;
};

ScrambleText.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trigger: PropTypes.bool,
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

const SkillItem = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SkillCell
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <StatusText $active={isHovered}>
        {isHovered ? '[DECRYPTED]' : '[ENCRYPTED]'}
      </StatusText>

      <DecryptOverlay
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <span style={{ color: '#333', fontSize: '1.4rem', fontFamily: 'monospace' }}>
          <ScrambleText text="XXXXX" trigger={true} duration={2000} />
        </span>
      </DecryptOverlay>

      <motion.div
        animate={{
          y: isHovered ? 0 : 12,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        style={{ zIndex: 1 }}
      >
        <skill.Icon size={60} color={skill.color} />
      </motion.div>

      <motion.p
        style={{
          marginTop: '12px',
          color: 'white',
          fontSize: '0.9rem',
          fontFamily: 'monospace',
          zIndex: 1,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {skill.name}
      </motion.p>

      {isHovered && (
        <motion.div
          style={{
            position: 'absolute',
            width: '110%',
            height: '110%',
            background: `radial-gradient(circle at center, ${skill.color}22 0%, transparent 70%)`,
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </SkillCell>
  );
};

SkillItem.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

const SkillsCarousel = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.5 });

  return (
    <SkillsSection id="skills">
      <InnerWrapper>
        <Header ref={headerRef}>
          <ScrambleText text="Toolbox" trigger={isHeaderInView} />
        </Header>

        <Grid>
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </Grid>
      </InnerWrapper>
    </SkillsSection>
  );
};

SkillsCarousel.propTypes = {
  isMobile: PropTypes.bool,
};

export default SkillsCarousel;