import styled from 'styled-components';

const DecorContainer = styled.div`
  /* Vaihdetaan fixed -> absolute */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Pysyy Heron sisällön takana */
  background: #000;
  overflow: hidden;
  pointer-events: none;
`;

const NeonGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg, 
    rgba(223, 255, 0, 0.4) 0%, 
    rgba(223, 255, 0, 0.4) 50%, 
    rgba(191, 0, 255, 0.4) 50%, 
    rgba(191, 0, 255, 0.4) 100%
  );
`;

const FloatingNumber = styled.div`
  position: absolute;
  /* Käytetään kiinteitä prosentteja ilman monimutkaista transform-taistelua */
  top: 50%;
  left: 50%;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(10rem, 30vw, 30rem); /* Pienennettiin hieman vakauden vuoksi */
  color: #000;
  text-shadow: 
    1px 1px 0px rgba(255, 255, 255, 0.1),
    10px 10px 20px rgba(0,0,0,0.5);
  
  white-space: nowrap;
  transform: translate(-50%, -50%) rotate(-12deg);
  user-select: none;
  /* Kerroslukitus */
  will-change: transform;
`;

const FloatingText = styled.div`
  position: absolute;
  font-family: var(--font-heading);
  font-weight: 800;
  font-style: italic;
  font-size: clamp(3rem, 10vw, 8rem);
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  text-transform: uppercase;
  user-select: none;
`;

const BackgroundDecor = () => {
  return (
    <DecorContainer>
      <NeonGlow />
      <FloatingNumber>44</FloatingNumber>

      <FloatingText style={{ top: '15%', left: '-5%', transform: 'rotate(-5deg)' }}>
        HEISKANEN / 44 / SPEED
      </FloatingText>

      <FloatingText style={{ bottom: '15%', right: '-10%', transform: 'rotate(8deg)' }}>
        FULLSTACK / CYBER
      </FloatingText>
    </DecorContainer>
  );
};

export default BackgroundDecor;