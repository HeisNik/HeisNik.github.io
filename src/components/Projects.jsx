import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AnomalySection = styled.section`
  position: relative;
  height: 400vh; /* Sopiva pituus, jotta kaaos ehtii tapahtua */
  background: #000;
  overflow: clip; /* Estetään scrollbar-sekoilu */
`;

const StickyViewport = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
  overflow: hidden;
`;

const ChaoticHeader = styled(motion.h1)`
  position: absolute;
  left: 0;
  font-size: clamp(2.0rem, 8vw, 9rem);
  font-weight: 900;
  color: white;
  white-space: nowrap;
  line-height: 0.8;
  z-index: 100;
  pointer-events: none;
  text-transform: uppercase;
  
  span {
    color: turquoise;
    opacity: 0.5;
  }
`;

const InnerCard = styled.div`
  width: clamp(280px, 35vw, 500px);
  padding: 40px;
  background: rgba(5, 5, 5, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 50px rgba(0,0,0,1);
  position: relative;
  overflow: hidden;
  
  .glitch-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $accent }) => $accent || 'turquoise'};
    opacity: 0.3;
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0%, 100% { transform: translateY(0); opacity: 0.3; }
    50% { transform: translateY(100%); opacity: 0.8; }
  }
  
  h2 { 
    font-size: clamp(1.8rem, 4vw, 2.2rem); 
    font-weight: 900; 
    color: white; 
    margin: 10px 0; 
    text-transform: uppercase;
    line-height: 0.9;
    word-break: break-word;
  }
  
  small { 
    font-family: monospace; 
    color: ${props => props.$accent || 'turquoise'}; 
    font-size: 0.8rem;
    display: block;
    margin-bottom: 10px;
  }
  
  p { 
    color: #777; 
    font-size: 0.9rem; 
    line-height: 1.4; 
    margin: 15px 0 20px 0; 
  }
  
  .links {
    display: flex; 
    gap: 10px;
    flex-wrap: wrap;
    
    a { 
      text-decoration: none; 
      font-family: monospace; 
      font-size: 0.8rem; 
      border: 1px solid; 
      padding: 4px 8px; 
      transition: 0.2s;
      color: ${({ $accent }) => $accent || 'turquoise'};
      
      &:hover { 
        background: currentColor; 
        color: black !important; 
      }
    }
  }
`;

// --- APUKOMPONENTIT ---

const ProjectAnomalyCard = ({ project, index, scrollProgress, totalProjects }) => {
  // Määritetään jokaiselle kortille täysin uniikki "lentosuunnitelma"
  // Näitä arvoja voi muuttaa per kortti, jotta ne tulevat eri suunnista
  const variants = [
    { startX: -1000, startY: -500, startZ: -2000, rot: 45 },  // Ylhäältä vasemmalta syvyydestä
    { startX: 1200, startY: 200, startZ: -1000, rot: -30 },   // Oikealta keskeltä
    { startX: 0, startY: 1000, startZ: -500, rot: 15 },       // Alhaalta suoraan up
    { startX: -800, startY: 400, startZ: -1500, rot: -60 },   // Alaviistosta
    { startX: 500, startY: -1000, startZ: -1000, rot: 90 },   // Katosta alas
    { startX: 0, startY: 0, startZ: -3000, rot: 0 },          // Suoraan kohti syvyydestä
  ];

  const v = variants[index % variants.length];
  
  // Lasketaan perus-start
  let start = index * 0.1;
  
  // JOS kyseessä on viimeinen kortti (index on total - 1)
  if (index === totalProjects - 1) {
    // Myöhästetään aloitusta hieman (esim. 0.5 -> 0.6)
    start = index * 0.12; 
  }

  // Pidetään kortti näytöllä hieman pidempään (end-arvon kasvatus)
  const end = start + 0.3;

  // Animaatiot: Satunnaisesta pisteestä -> Oma paikka -> Ulos näytöltä
  const x = useTransform(scrollProgress, [start, start + 0.15, end], [v.startX, 0, v.startX * -0.5]);
  const y = useTransform(scrollProgress, [start, start + 0.15, end], [v.startY, 0, v.startY * -0.5]);
  const z = useTransform(scrollProgress, [start, start + 0.15, end], [v.startZ, 0, 500]);
  const rotate = useTransform(scrollProgress, [start, start + 0.15], [v.rot, 0]);
  const opacity = useTransform(scrollProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        x, y, z, rotate, opacity,
        transformStyle: 'preserve-3d'
      }}
    >
      <InnerCard $accent={project.accent}>
         <div className="glitch-line" />
         <small>{`// ARCHIVE_NODE_0${index + 1}`}</small>
         <h2>{project.title}</h2>
         <p>{project.description}</p>
         <div className="links">
            {project.links.map(l => (
              <a 
                key={l.href} 
                href={l.href} 
                target="_blank" 
                rel="noreferrer"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
         </div>
      </InnerCard>
    </motion.div>
  );
};

ProjectAnomalyCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    accent: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  scrollProgress: PropTypes.any.isRequired,
  totalProjects: PropTypes.number.isRequired,
};

// --- PÄÄKOMPONENTTI ---

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 15 });

  // OTSIKKO-ANIMAATIO: Tulee lujaa vasemmalta ja pysähtyy
  const headerX = useTransform(smoothProgress, [0, 0.15], ["-100%", "5%"]);
  const headerSkew = useTransform(smoothProgress, [0, 0.1, 0.15], [40, 20, 0]);

  const projects = [
    {
      title: 'Property App',
      accent: 'turquoise',
      category: 'FULL_STACK',
      description: 'Java Spring Boot + PostgreSQL property platform with image uploads, Spring Security authz, and filesystem storage.',
      links: [
        { label: 'Backend', href: 'https://github.com/HeisNik/propertyAppBackend' },
        { label: 'Frontend', href: 'https://github.com/HeisNik/propertyAppFrontend' },
      ],
    },
    {
      title: 'Album App',
      accent: '#61dafb',
      category: 'NODE/EXPRESS',
      description: 'Node.js + Express + MongoDB album manager with Jest-tested endpoints and clean REST patterns.',
      links: [{ label: 'Repository', href: 'https://github.com/HeisNik/wsp-renderApp' }],
    },
    {
      title: 'Anecdote Sharing',
      accent: '#f87171',
      category: 'REACT/REDUX',
      description: 'React app for posting and voting anecdotes, state handled with Redux for smooth UX.',
      links: [
        {
          label: 'Repository',
          href: 'https://github.com/HeisNik/fullstack-palautus/tree/main/osa6/redux-anecdotes',
        },
      ],
    },
    {
      title: 'Vehicle App',
      accent: '#7dd3fc',
      category: 'GRAPHQL/API',
      description: 'Node.js + Express + GraphQL backend for vehicle CRUD with PostgreSQL persistence and auth.',
      links: [{ label: 'Backend', href: 'https://github.com/HeisNik/vehicleApp' }],
    },
    {
      title: 'Fishing Social',
      accent: '#22d3ee',
      category: 'FULL_STACK',
      description: 'WIP fishing social app with posts, photos, and spot discovery; separate front- and backend repos.',
      links: [
        { label: 'Frontend', href: 'https://github.com/HeisNik/anglersApp' },
        { label: 'Backend', href: 'https://github.com/HeisNik/anglerAppBackend' },
      ],
    },
    {
      title: 'Cybersecurity Toolkit',
      accent: '#facc15',
      category: 'SECURITY/C#',
      description: 'C# toolkit including hashing, port scanner, encryption/decryption, and keylogger utilities.',
      links: [{ label: 'Repository', href: 'https://github.com/HeisNik/cryptDefender' }],
    },
  ];

  return (
    <AnomalySection ref={containerRef} id="projects">
      <StickyViewport>
        <ChaoticHeader style={{ x: headerX, skewX: headerSkew }}>
          Selected<br /><span>Works</span>
        </ChaoticHeader>

        {projects.map((p, i) => (
          <ProjectAnomalyCard 
            key={p.title} 
            project={p} 
            index={i} 
            totalProjects={projects.length}
            scrollProgress={smoothProgress} 
          />
        ))}
      </StickyViewport>
    </AnomalySection>
  );
};

export default Projects;
