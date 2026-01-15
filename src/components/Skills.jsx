import { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

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
  padding: 0 clamp(6vw, 8vw, 10vw);
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SkillCell = styled(motion.div)`
  background: #000;
  aspect-ratio: 1.2 / 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: crosshair;
  overflow: hidden;

  &:before {
    content: 'L-N4';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0.5rem;
    color: #333;
    font-family: monospace;
  }
`;

const RGBGhost = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
`;

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

const SkillItem = ({ skill, velocity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shift = useTransform(velocity, [-1, 1], [-15, 15]);
  const shiftNeg = useTransform(shift, (s) => -s);
  const opacity = useTransform(velocity, [-1, 0, 1], [0.5, 0, 0.5]);

  return (
    <SkillCell
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ backgroundColor: 'rgba(64, 224, 208, 0.02)' }}
    >
      <RGBGhost style={{ x: shift, opacity, color: '#ff4081' }}>
        <skill.Icon size={50} />
      </RGBGhost>
      <RGBGhost style={{ x: shiftNeg, opacity, color: '#00ffff' }}>
        <skill.Icon size={50} />
      </RGBGhost>

      <motion.div
        animate={isHovered ? { scale: 1.1, filter: 'hue-rotate(90deg)' } : { scale: 1 }}
        style={{ zIndex: 2 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      >
        <skill.Icon size={60} color={isHovered ? 'turquoise' : skill.color} />
      </motion.div>

      <motion.p
        style={{
          marginTop: '15px',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          color: isHovered ? 'white' : '#666',
          zIndex: 2,
        }}
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isHovered ? `> ${skill.name}` : skill.name}
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
};

const Skills = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  const skewX = useTransform(smoothVelocity, [-1, 1], [-10, 10]);
  const rotateY = useTransform(smoothVelocity, [-1, 1], [-5, 5]);

  return (
    <SectionWrapper ref={targetRef} id="skills-grid">
      <InnerWrapper>
        <div style={{ marginBottom: '60px' }}>
          <span style={{ color: 'turquoise', fontFamily: 'monospace' }}>
            {'// TECHNICAL_STACK'}
          </span>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(3rem, 6vw, 8rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Expertise
          </h2>
        </div>

        <Grid style={{ skewX, rotateY, perspective: 1000 }}>
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} velocity={smoothVelocity} />
          ))}
        </Grid>
      </InnerWrapper>
    </SectionWrapper>
  );
};

export default Skills;