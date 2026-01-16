import { useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';



const HeroSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const HeroInner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 120px clamp(1.5rem, 5vw, 6vw) 60px;
  display: flex;
  align-items: center;
  justify-content: center; /* Pitää elementit keskellä */
  min-height: 100vh;
  gap: clamp(20px, 5vw, 80px); /* Joustava väli */
  width: 100%;

  @media (max-width: 1140px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  min-width: 0;
  z-index: 2;

  h1 {
    /* 1.2rem minimi, 6vw on vauhti, 3.5rem on maksimi */
    font-size: clamp(1.2rem, 4.5vw, 3.2rem); 
    line-height: 1.1;
    color: white;
    /* Sallitaan rivitys, jotta se ei mene kuvan päälle */
    white-space: normal; 
    /* Estetään kuitenkin nimen katkeaminen keskeltä sanaa */
    word-break: keep-all; 

    @media (max-width: 1140px) {
      text-align: center;
      font-size: clamp(1.1rem, 8vw, 2.5rem);
    }
  }
`;
const RoleLine = styled.div` /* Vaihdettu span -> div, varmempi block-käytös */
  color: ${props => props.$color || 'turquoise'} !important;
  display: block;
  
  /* SALLITAAN RIVITYS */
  white-space: normal; 
  word-wrap: break-word;
  
  /* POISTETAAN OVERFLOW HIDDEN, jotta teksti saa näkyä */
  overflow: visible; 
  
  /* VARATAAN TILA: 
     Laitetaan min-height niin korkeaksi, että 2-3 riviä mahtuu mobiilissa 
     ilman että laatikon koko muuttuu */
  min-height: 3.6em; /* 3 riviä (3 x 1.2em) */
  line-height: 1.2em;
  
  @media (min-width: 1141px) {
    min-height: 4.4em; /* Desktopissa riittää yksi rivi */
  }

  margin: 0;
  padding: 0;
  
  .Typewriter {
    display: inline;
  }
`;
const Image = styled.img`
  /* flex-shrink: 1 sallii kuvan pienenemisen vähän, jos teksti tarvitsee tilaa */
  flex: 0 1 400px; 
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 900px) {
    max-width: 280px;
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
      <HeroInner>
        <HeroContent>
          <h1>
            I&apos;m Niko Heiskanen
            <RoleLine $color={roleColor} as="span">
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
          </h1>
        </HeroContent>
        <Image src="/images/IMG_9916.jpg" alt="Niko Heiskanen" />
      </HeroInner>
    </HeroSection>
  );
}

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