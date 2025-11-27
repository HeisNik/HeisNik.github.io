import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const rotateHorizontal = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Skills data array
const skills = [
  { name: 'React', Icon: FaReact, color: '#61dafb' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#68a063' },
  { name: 'Python', Icon: FaPython, color: '#336791' },
  { name: 'PostgreSQL', Icon: BiLogoPostgresql, color: '#336791' },
  { name: 'MongoDB', Icon: BiLogoMongodb, color: '#68a063' },
  { name: 'GraphQL', Icon: GrGraphQl, color: '#e10098' },
  { name: 'Docker', Icon: FaDocker, color: '#0077B5' },
  { name: 'Java Spring', Icon: SiSpring, color: '#68a063' },
  { name: 'Render', Icon: SiRender, color: 'black' },
  { name: 'Azure', Icon: VscAzure, color: '#0077B5' },
  { name: 'Kali Linux', Icon: SiKalilinux, color: 'black' }
];

// Responsive icon size configuration
const getIconSize = (isMobile, isMediumScreen) => {
  if (isMobile) return 60; // Pystysuunta: isommat ikonit
  if (isMediumScreen) return 70; // 1000-1150px: hieman pienemmät ikonit
  return 75; // >1150px: desktop ikonit
};

const SkillsWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  box-sizing: border-box;
  overflow: hidden;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    align-items: flex-start;
    margin-bottom: 150px;
  }
`;

const Header = styled.h1`
  color: turquoise;
  width: 80%;
  max-width: 600px;
  font-size: 5.2em;
  text-align: center;
  margin: 75px auto 100px;

  @media (min-width: 768px) {
    margin: 150px auto 200px;
  }
`;

const IconWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  width: 200%;
  animation: ${rotateHorizontal} 30s linear infinite;
  animation-play-state: running;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    height: auto;
    width: 100%;
    animation: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  text-align: center;

  @media (max-width: 1000px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

const SkillIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.2);
    color: #ff4081;
  }

  svg {
    margin-bottom: 10px;
  }

  p {
    @media (min-width: 1001px) and (max-width: 1150px) {
      font-size: 0.95em; /* Hieman pienennetty teksti 1000-1150px alueella */
    }
  }
`;

// SkillIcon component
const SkillIcon = ({ name, Icon, color, size }) => (
  <SkillIconWrapper>
    <Icon size={size} color={color} />
    <p>{name}</p>
  </SkillIconWrapper>
);

SkillIcon.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

const SkillsCarousel = ({ isMobile, isMediumScreen }) => {
  const iconSize = getIconSize(isMobile, isMediumScreen);

  return (
    <SkillsWrapper id="skills">
      <SkillsContainer>
        <Header>Skills</Header>
        <IconWrapper>
          <IconContainer>
            {skills.map((skill, index) => (
              <SkillIcon
                key={index}
                name={skill.name}
                Icon={skill.Icon}
                color={skill.color}
                size={iconSize}
              />
            ))}
          </IconContainer>
          {!isMobile && (
            <IconContainer>
              {skills.map((skill, index) => (
                <SkillIcon
                  key={`duplicate-${index}`}
                  name={skill.name}
                  Icon={skill.Icon}
                  color={skill.color}
                  size={iconSize}
                />
              ))}
            </IconContainer>
          )}
        </IconWrapper>
      </SkillsContainer>
    </SkillsWrapper>
  );
};

SkillsCarousel.propTypes = {
  isMobile: PropTypes.bool,
  isMediumScreen: PropTypes.bool
};

SkillsCarousel.defaultProps = {
  isMobile: false,
  isMediumScreen: false
};

export default SkillsCarousel;
