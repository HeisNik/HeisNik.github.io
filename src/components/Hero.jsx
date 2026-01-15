import { useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';



const HeroSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(6vw, 8vw, 10vw);
  padding-top: 76px; /* NavBar mobile */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 60px; /* Pienempi gap tabletille */
    padding-top: 117.78px; /* NavBar tablet/desktop */
  }
`;

const Text = styled.h1`
  color: turquoise;
  font-size: clamp(2.5rem, 5vw, 4.5rem);

   @media (min-width: 768px) {
    width: 100%;
    max-width: 800px;
  }
  
`;

const RoleWrapper = styled.div`
  position: relative;
  min-height: 3em; /* Reserve space for mobile line breaks */
  width: 100%;

  @media (min-width: 768px) {
    min-height: 1.5em; /* Single line on larger screens */
  }
`;

const RoleLine = styled.div`
  position: absolute; /* Float text within reserved space */
  top: 0;
  left: 0;
  right: 0;
  color: ${({ $color }) => $color || 'turquoise'};
  
  .Typewriter__cursor {
    color: ${({ $color }) => $color || 'turquoise'};
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(1.2, 1.2, 1.2, 1.2);
  transition: box-shadow 0.6s ease-in-out;

  &:hover {
    box-shadow: 0 16px 16px rgba(1.2, 1.2, 1.2, 1.2);
  }
`;

const roles = [
  { text: 'Full Stack Developer', color: 'turquoise' },
  { text: 'Cyber Security Enthusiast', color: 'red' },
];

const Hero = () => {
  const [roleColor, setRoleColor] = useState(roles[0].color);

  return (
  <HeroSection id="hero">
    <InnerWrapper>
      <Text>
        <b style={{ color: "white" }}>I&apos;m Niko Heiskanen</b> <br />
        <RoleWrapper>
          <RoleLine $color={roleColor}>
            <Typewriter
              onInit={(typewriter) => {
                const loopRoles = () => {
                  roles.forEach(({ text, color }) => {
                    typewriter
                      .callFunction(() => setRoleColor(color))
                      .typeString(text)
                      .pauseFor(1200)
                      .deleteAll(40);
                  });
                  typewriter.callFunction(loopRoles);
                };
                loopRoles();
                typewriter.start();
              }}
              options={{
                loop: true,
                delay: 60,
                deleteSpeed: 40,
              }}
            />
          </RoleLine>
        </RoleWrapper>
      </Text>
      <Image src={`/images/IMG_9916.jpg`} alt="Description" />
    </InnerWrapper>
  </HeroSection>
)}

export default Hero

/*
const Hero = () => {
    return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
    <h1 style={{color: "turquoise",width: "80%", maxWidth: "600px", margin: "0 auto", padding: "5px"} }> <b  style={{color: "white"}}>I'm Niko Heiskanen</b> full stack developer <b style={{color:"white"}}>and</b> <b style={{color: "red"}}>cyber security enthusiast</b></h1>
    <img style={{width:"400px"}} src={`/images/IMG_9916.jpg`} alt="Description" />
    </div>
)}
*/