import { div } from "framer-motion/client"
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { BiLogoPostgresql, BiLogoMongodb } from "react-icons/bi";
import { GrGraphQl } from "react-icons/gr";
import styled from 'styled-components';
import { SiKalilinux } from "react-icons/si";
import { SiSpring } from "react-icons/si";
import { FaDocker } from "react-icons/fa6";
import { SiRender } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const SkillsContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
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
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
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

const Skills = () => (
  <SkillsContainer id="skills">
    <Header>Skills</Header>
    <IconWrapper>
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
        <p>Mongo DB</p>
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
        <SiSpring size={75} color="#68a063"/>
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
        <SiKalilinux size={75} color="black"/>
        <p>Kali Linux</p>
    </div>
    </IconWrapper>
  </SkillsContainer>
);

export default Skills