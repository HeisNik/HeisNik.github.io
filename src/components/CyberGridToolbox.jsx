import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

// --- STYLED COMPONENTS ---

const MainContainer = styled.section`
  height: 400vh; /* Tämä luo skrollausmatkan pystysuunnassa */
  background: #000;
  position: relative;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden; /* Piilottaa ylitse menevät osat */
`;

const HorizontalTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  /* GAP: Skaalautuu 20px -> 80px riippuen näytöstä. Ei media queryjä. */
  gap: clamp(20px, 2vw, 100px);
  padding-left: 5vw;
  
`;

const HeaderBox = styled.div`
  flex-shrink: 0;
  /* LEVEYS: Skaalautuu dynaamisesti välillä 250px - 500px */
  width: clamp(250px, 30vw, 500px);
  padding-right: clamp(20px, 30vw, 900px);
  
  h2 {
    color: white;
    font-weight: 900;
    line-height: 0.85;
    /* TEKSTI: Skaalautuu välillä 2.2rem - 6rem */
    font-size: clamp(2.2rem, 8vw, 8rem);
  
  }
`;

const SkillItemSimple = styled.div`
  flex-shrink: 0;
  /* TÄMÄ ON SE RATKAISU: 
     Leveys on mobiilissa/tabletissa lähes koko ruutu (80vw),
     mutta maksimi on 600px, jottei se karkaa desktopissa liian suureksi.
  */
  width: clamp(300px, 60vw, 600px);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;

  h3 {
    color: white;
    font-size: clamp(1.5rem, 5vw, 3rem);
    margin: 15px 0;
    font-family: monospace;
  }
`;

const BigNumber = styled.div`
  position: absolute;
  /* NUMERO: Skaalautuu itemin mukana */
  font-size: clamp(8rem, 25vw, 20rem);
  font-weight: 900;
  color: rgba(255, 255, 255, 0.04);
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  pointer-events: none;
`;


const skills = [
  { name: 'React', Icon: FaReact, color: '#61dafb', category: 'FRONTEND' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#68a063', category: 'BACKEND' },
  { name: 'Python', Icon: FaPython, color: '#336791', category: 'BACKEND' },
  { name: 'PostgreSQL', Icon: BiLogoPostgresql, color: '#336791', category: 'DATABASE' },
  { name: 'MongoDB', Icon: BiLogoMongodb, color: '#68a063', category: 'DATABASE' },
  { name: 'GraphQL', Icon: GrGraphQl, color: '#e10098', category: 'API' },
  { name: 'Docker', Icon: FaDocker, color: '#0077B5', category: 'DEVOPS' },
  { name: 'Java Spring', Icon: SiSpring, color: '#68a063', category: 'BACKEND' },
  { name: 'Render', Icon: SiRender, color: '#ffffff', category: 'CLOUD' },
  { name: 'Azure', Icon: VscAzure, color: '#0077B5', category: 'CLOUD' },
  { name: 'Kali Linux', Icon: SiKalilinux, color: '#00adef', category: 'SECURITY' },
];

const CyberGridToolbox = ({ skills: customSkills }) => {
  const targetRef = useRef(null);
  const trackRef = useRef(null); // Ref radalle matkan laskemista varten
  const [scrollRange, setScrollRange] = useState(0);

  const skillsToUse = customSkills || skills;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Lasketaan tarkka rullausmatka pikseleinä
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        // Matka = Radan koko miinus ruudun leveys
        const range = trackRef.current.scrollWidth - window.innerWidth;
        setScrollRange(-range);
      }
    };

    calculateRange();
    window.addEventListener('resize', calculateRange);
    return () => window.removeEventListener('resize', calculateRange);
  }, [skillsToUse]);

  // Alkuperäinen muunnos (pikselit ovat vakaampia kuin prosentit)
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);
  
  // Lisää spring-fysiikka (tekee liikkeestä sulavamman/pehmeämmän)
  const x = useSpring(xRaw, { stiffness: 400, damping: 90, mass: 1 });

  return (
    <MainContainer ref={targetRef} id="skills">
      <StickyWrapper>
        {/* Lisätty ref={trackRef} */}
        <HorizontalTrack ref={trackRef} style={{ x }}>
          
          <HeaderBox>
            <span>{'//'} RECONNAISSANCE_LOG</span>
            <h2>TOOLBOX</h2>
          </HeaderBox>

          {skillsToUse.map((skill, index) => (
            <SkillItemSimple key={index}>
              <BigNumber>{String(index + 1).padStart(2, '0')}</BigNumber>
              <div style={{ filter: `drop-shadow(0 0 20px ${skill.color}44)` }}>
                <skill.Icon size={120} color={skill.color} />
              </div>
              <h3 style={{ margin: '15px 0' }}>{skill.name}</h3>
              <div className="category">{'>'} {skill.category}</div>
            </SkillItemSimple>
          ))}

        </HorizontalTrack>
      </StickyWrapper>
    </MainContainer>
  );
};

CyberGridToolbox.propTypes = {
  skills: PropTypes.array,
};

export default CyberGridToolbox;

