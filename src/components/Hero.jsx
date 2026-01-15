import styled from 'styled-components';
import Typewriter from 'typewriter-effect';



const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  padding-top: 76px; /* 20px + 56px NavBar mobile */
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto;
  
  
  

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 60px; /* Pienempi gap tabletille */
    padding: 20px;
    padding-top: 117.78px; /* 20px + 97.78px NavBar tablet/desktop */
  }

  @media (min-width: 1024px) {
    gap: 150px; /* Isompi gap desktopille */
  }
`;

const Text = styled.h1`
  color: turquoise;

   @media (min-width: 768px) {
    width: 80%;
  max-width: 600px;
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
  color: turquoise;
  
  .Typewriter__cursor {
    color: turquoise;
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
  'Full Stack Developer',
  '<span style="color:red;">Cyber Security Enthusiast</span>',
];

const Hero = () => {
  return (
  <div id="hero">
  <HeroContainer>
    <Text>
      <b style={{ color: "white" }}>I&apos;m Niko Heiskanen</b> <br />
      <RoleWrapper>
        <RoleLine>
          <Typewriter
            options={{
              strings: roles,
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 40,
              pauseFor: 1200,
            }}
          />
        </RoleLine>
      </RoleWrapper>
    </Text>
    <Image src={`/images/IMG_9916.jpg`} alt="Description" />
  </HeroContainer>
  </div>
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