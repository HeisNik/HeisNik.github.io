import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const rotate = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const GlitchWrapper = styled.div`
  width: 100%;
  padding: 150px 0;
  overflow: hidden;
  background: #000;
  position: relative;
`;

const ScrollingTrack = styled(motion.div)`
  display: flex;
  width: fit-content;
  white-space: nowrap;
  animation: ${rotate} 30s linear infinite;
`;

const SkillBox = styled(motion.div)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 60px;
  position: relative;
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

const GlitchCarousel = () => {
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    clamp: false,
    mass: 0.1,
    stiffness: 100,
    damping: 30,
  });

  const skewX = useTransform(smoothVelocity, [-1, 1], [-20, 20]);
  const blurValue = useTransform(smoothVelocity, [-1, 0, 1], [5, 0, 5]);
  const blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const ghostOpacity = useTransform(smoothVelocity, [-1, 0, 1], [0.5, 0, 0.5]);
  const ghostX = useTransform(smoothVelocity, [-1, 1], [-10, 10]);

  const loopedSkills = useMemo(() => [...skills, ...skills], []);

  return (
    <GlitchWrapper id="skills-glitch">
      <h2
        style={{
          color: 'turquoise',
          textAlign: 'center',
          marginBottom: '50px',
          fontSize: '4rem',
          fontWeight: 900,
          letterSpacing: '0.15em',
        }}
      >
        CORE_STACK
      </h2>

      <ScrollingTrack style={{ skewX }}>
        {loopedSkills.map((skill, i) => (
          <SkillBox key={`${skill.name}-${i}`} style={{ filter: blurFilter }}>
            <skill.Icon size={80} color={skill.color} />
            <p
              style={{
                color: 'white',
                marginTop: '10px',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
              }}
            >
              {skill.name}
            </p>

            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: ghostOpacity,
                x: ghostX,
                color: '#ff4081',
                zIndex: -1,
              }}
            >
              <skill.Icon size={80} />
            </motion.div>
          </SkillBox>
        ))}
      </ScrollingTrack>
    </GlitchWrapper>
  );
};

export default GlitchCarousel;

