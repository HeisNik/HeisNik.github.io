import { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const glitchAnim = keyframes`
  0% { clip-path: inset(80% 0 1% 0); transform: translateX(-5px); }
  20% { clip-path: inset(20% 0 50% 0); transform: translateX(5px); }
  40% { clip-path: inset(10% 0 80% 0); transform: translateX(-5px); }
  60% { clip-path: inset(50% 0 10% 0); transform: translateX(5px); }
  80% { clip-path: inset(30% 0 30% 0); transform: translateX(-5px); }
  100% { clip-path: inset(80% 0 1% 0); transform: translateX(5px); }
`;

const ProjectsSection = styled.section`
  width: 100%;
  padding: 150px 0;
  background: #000;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(6vw, 8vw, 10vw);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 60px;
`;

const CardFrame = styled(motion.div)`
  position: relative;
  height: 550px;
  background: rgba(5, 5, 5, 1);
  border-left: 2px solid ${({ $accent }) => $accent || 'turquoise'};
  padding: 40px;
  display: flex;
  flex-direction: column;
  cursor: crosshair;
  overflow: hidden;

  &:before {
    content: "FILE_SCAN_0${({ $index }) => $index + 1}";
    position: absolute;
    top: 15px;
    right: 20px;
    font-family: monospace;
    font-size: 0.6rem;
    color: #444;
    z-index: 5;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0px,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    opacity: 0;
    pointer-events: none;
    z-index: 1;
  }

  &:hover:after {
    opacity: 0.15;
    animation: ${glitchAnim} 0.2s infinite;
  }
`;

const ScanningLine = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: ${({ $accent }) => $accent || 'turquoise'};
  box-shadow: 0 0 15px ${({ $accent }) => $accent || 'turquoise'};
  opacity: 0.2;
  z-index: 3;
`;

const ProjectTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 20px;
`;

const CyberButton = styled.a`
  margin-top: auto;
  padding: 12px 20px;
  border: 1px solid ${({ $accent }) => $accent || 'turquoise'};
  color: ${({ $accent }) => $accent || 'turquoise'};
  text-transform: uppercase;
  font-family: monospace;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  width: fit-content;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    background: ${({ $accent }) => $accent || 'turquoise'};
    color: black;
    box-shadow: 0 0 20px ${({ $accent }) => $accent || 'turquoise'};
  }
`;

const LinksRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scanY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <CardFrame
      ref={cardRef}
      style={{ y, opacity }}
      $accent={project.accent}
      $index={index}
    >
      <ScanningLine style={{ top: scanY }} $accent={project.accent} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <span
          style={{
            color: project.accent,
            fontFamily: 'monospace',
            fontSize: '0.8rem',
          }}
        >
          {`// CATEGORY: ${project.category}`}
        </span>
        <ProjectTitle>{project.title}</ProjectTitle>
        <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.1rem' }}>
          {project.description}
        </p>
      </div>

      <LinksRow style={{ position: 'relative', zIndex: 5 }}>
        {project.links.map((link) => (
          <CyberButton
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            $accent={project.accent}
          >
            {link.label}
          </CyberButton>
        ))}
      </LinksRow>
    </CardFrame>
  );
};

ProjectCard.propTypes = {
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
};

const Projects = () => {
  const projects = [
    {
      title: 'Property App',
      category: 'FULL_STACK',
      accent: 'turquoise',
      description:
        'Java Spring Boot + PostgreSQL property platform with image uploads, Spring Security authz, and filesystem storage.',
      links: [
        { label: 'Backend', href: 'https://github.com/HeisNik/propertyAppBackend' },
        { label: 'Frontend', href: 'https://github.com/HeisNik/propertyAppFrontend' },
      ],
    },
    {
      title: 'Album App',
      category: 'NODE/EXPRESS',
      accent: '#61dafb',
      description:
        'Node.js + Express + MongoDB album manager with Jest-tested endpoints and clean REST patterns.',
      links: [{ label: 'Repository', href: 'https://github.com/HeisNik/wsp-renderApp' }],
    },
    {
      title: 'Anecdote Sharing',
      category: 'REACT/REDUX',
      accent: '#f87171',
      description:
        'React app for posting and voting anecdotes, state handled with Redux for smooth UX.',
      links: [
        {
          label: 'Repository',
          href: 'https://github.com/HeisNik/fullstack-palautus/tree/main/osa6/redux-anecdotes',
        },
      ],
    },
    {
      title: 'Vehicle App',
      category: 'GRAPHQL/API',
      accent: '#7dd3fc',
      description:
        'Node.js + Express + GraphQL backend for vehicle CRUD with PostgreSQL persistence and auth.',
      links: [{ label: 'Backend', href: 'https://github.com/HeisNik/vehicleApp' }],
    },
    {
      title: 'Fishing Social',
      category: 'FULL_STACK',
      accent: '#22d3ee',
      description:
        'WIP fishing social app with posts, photos, and spot discovery; separate front- and backend repos.',
      links: [
        { label: 'Frontend', href: 'https://github.com/HeisNik/anglersApp' },
        { label: 'Backend', href: 'https://github.com/HeisNik/anglerAppBackend' },
      ],
    },
    {
      title: 'Cybersecurity Toolkit',
      category: 'SECURITY/C#',
      accent: '#facc15',
      description:
        'C# toolkit including hashing, port scanner, encryption/decryption, and keylogger utilities.',
      links: [{ label: 'Repository', href: 'https://github.com/HeisNik/cryptDefender' }],
    },
  ];

  return (
    <ProjectsSection id="projects">
      <InnerWrapper>
        <div style={{ marginBottom: '100px' }}>
          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(4rem, 10vw, 12rem)',
              fontWeight: 900,
              lineHeight: 0.8,
            }}
          >
            SELECTED
            <br />
            <span style={{ color: 'turquoise' }}>WORKS</span>
          </h1>
        </div>
        <Grid>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </Grid>
      </InnerWrapper>
    </ProjectsSection>
  );
};

export default Projects;
