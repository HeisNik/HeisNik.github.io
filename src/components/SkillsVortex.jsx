import { useRef } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const VortexSection = styled.section`
  height: 250vh;
  position: relative;
  background: #050505;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  overflow: hidden;
`;

const OrbitContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
`;

const SkillOrb = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity, filter;

  p {
    color: white;
    font-size: 0.8rem;
    margin-top: 10px;
    font-family: 'monospace';
    text-transform: uppercase;
  }
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

const OrbitalIcon = ({ index, total, progress, skill }) => {
  const angleOffset = (index / total) * Math.PI * 2;
  const rotation = useTransform(progress, [0, 1], [0, Math.PI * 4]);

  const x = useTransform(rotation, (r) => Math.cos(r + angleOffset) * 400);
  const z = useTransform(rotation, (r) => Math.sin(r + angleOffset) * 600);
  const opacity = useTransform(z, [-600, 0, 600], [0.1, 0.5, 1]);
  const scale = useTransform(z, [-600, 600], [0.5, 1.5]);
  const blurValue = useTransform(z, [-600, 0, 600], ['8px', '2px', '0px']);
  const filter = useMotionTemplate`blur(${blurValue})`;

  return (
    <SkillOrb
      style={{
        x,
        z,
        opacity,
        scale,
        filter,
      }}
    >
      <div
        style={{
          padding: '20px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          border: `1px solid ${skill.color}44`,
          boxShadow: `0 0 20px ${skill.color}22`,
        }}
      >
        <skill.Icon size={50} color={skill.color} />
      </div>
      <p>{skill.name}</p>
    </SkillOrb>
  );
};

const SkillsVortex = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <VortexSection ref={containerRef} id="skills">
      <StickyWrapper>
        <h2
          style={{
            position: 'absolute',
            color: 'turquoise',
            zIndex: 0,
            fontSize: '15vw',
            opacity: 0.03,
            fontWeight: 900,
            letterSpacing: '0.2em',
          }}
        >
          STACK
        </h2>

        <OrbitContainer>
          {skills.map((skill, index) => (
            <OrbitalIcon
              key={skill.name}
              index={index}
              total={skills.length}
              progress={scrollYProgress}
              skill={skill}
            />
          ))}
        </OrbitContainer>
      </StickyWrapper>
    </VortexSection>
  );
};

export default SkillsVortex;

