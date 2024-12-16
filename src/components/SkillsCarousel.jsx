import styled, { keyframes } from 'styled-components';
import { FaReact, FaNodeJs, FaPython, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';
import { SiSpring, SiRender, SiKalilinux } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const rotateHorizontal = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
   margin-bottom: 150px;

  @media (min-width: 768px) {
    align-items: flex-start;
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }

  div {
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
  }
`;

const SkillsCarousel = ({ isMobile }) => (
  <SkillsContainer id="skills">
    <Header>Skills</Header>
    <IconWrapper>
      <IconContainer>
        <div>
          <FaReact size={75} color="#61dafb" />
          <p>React</p>
        </div>
        <div>
          <FaNodeJs size={75} color="#68a063" />
          <p>Node.js</p>
        </div>
        <div>
          <FaPython size={75} color="#336791" />
          <p>Python</p>
        </div>
        <div>
          <BiLogoPostgresql size={75} color="#336791" />
          <p>PostgreSQL</p>
        </div>
        <div>
          <BiLogoMongodb size={75} color="#68a063" />
          <p>MongoDB</p>
        </div>
        <div>
          <GrGraphQl size={75} color="#e10098" />
          <p>GraphQL</p>
        </div>
        <div>
          <FaDocker size={75} color="#0077B5" />
          <p>Docker</p>
        </div>
        <div>
          <SiSpring size={75} color="#68a063" />
          <p>Java Spring</p>
        </div>
        <div>
          <SiRender size={75} color="black" />
          <p>Render</p>
        </div>
        <div>
          <VscAzure size={75} color="#0077B5" />
          <p>Azure</p>
        </div>
        <div>
          <SiKalilinux size={75} color="black" />
          <p>Kali Linux</p>
        </div>
      </IconContainer>
      {!isMobile && (
        <IconContainer>
          <div>
            <FaReact size={75} color="#61dafb" />
            <p>React</p>
          </div>
          <div>
            <FaNodeJs size={75} color="#68a063" />
            <p>Node.js</p>
          </div>
          <div>
            <FaPython size={75} color="#336791" />
            <p>Python</p>
          </div>
          <div>
            <BiLogoPostgresql size={75} color="#336791" />
            <p>PostgreSQL</p>
          </div>
          <div>
            <BiLogoMongodb size={75} color="#68a063" />
            <p>MongoDB</p>
          </div>
          <div>
            <GrGraphQl size={75} color="#e10098" />
            <p>GraphQL</p>
          </div>
          <div>
            <FaDocker size={75} color="#0077B5" />
            <p>Docker</p>
          </div>
          <div>
            <SiSpring size={75} color="#68a063" />
            <p>Java Spring</p>
          </div>
          <div>
            <SiRender size={75} color="black" />
            <p>Render</p>
          </div>
          <div>
            <VscAzure size={75} color="#0077B5" />
            <p>Azure</p>
          </div>
          <div>
            <SiKalilinux size={75} color="black" />
            <p>Kali Linux</p>
          </div>
        </IconContainer>
      )}
    </IconWrapper>
  </SkillsContainer>
);

export default SkillsCarousel;