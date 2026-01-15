import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const MainSection = styled.section`
  position: relative;
  height: 400vh; /* Kuinka pitkään horisontaalinen scroll kestää */
  background: transparent;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HorizontalContainer = styled(motion.div)`
  display: flex;
  gap: clamp(3rem, 8vw, 10rem);
  padding: 0 clamp(6vw, 8vw, 10vw);
`;

const ContentCard = styled.div`
  flex-shrink: 0;
  width: 82vw;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: clamp(1.5rem, 4vw, 2.75rem);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
`;

const CardTitle = styled.h2`
  color: turquoise;
  font-size: clamp(2.8rem, 7vw, 5.6rem);
  margin: 0 0 1.2rem;
  text-transform: uppercase;
  line-height: 1;
  font-weight: 900;
`;

const CardText = styled.p`
  color: white;
  font-size: clamp(1.1rem, 2.2vw, 1.7rem);
  line-height: 1.65;
  margin: 0;
  max-width: 700px;
`;

const About = () => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '-65%']
  );

  return (
    <MainSection ref={targetRef} id="about">
      <StickyWrapper>
        <HorizontalContainer style={{ x }}>
          <ContentCard>
            <CardTitle>Who is<br/>Niko?</CardTitle>
            <CardText>
              ICT student laser-focused on <b>Full-Stack Development</b> and <b>Cybersecurity</b>.
              Building secure, performant apps is the core of what I do.
            </CardText>
          </ContentCard>

          <ContentCard>
            <CardTitle>The<br/>Developer</CardTitle>
            <CardText>
              React, Node.js, and Java Spring for front-to-back delivery.
              From MongoDB to PostgreSQL, I design data that stays consistent and fast.
            </CardText>
          </ContentCard>

          <ContentCard>
            <CardTitle>The Cyber<br/>Enthusiast</CardTitle>
            <CardText>
              Ethical hacking and red team mindset with Kali Linux tooling.
              Continuously sharpening reconnaissance and exploitation skills to stay ahead of threats.
            </CardText>
          </ContentCard>
        </HorizontalContainer>
      </StickyWrapper>
    </MainSection>
  );
};

export default About;
