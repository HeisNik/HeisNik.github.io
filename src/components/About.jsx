import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

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

const ContentCard = styled(motion.div)`
  flex-shrink: 0;
  width: 85vw;
  min-width: 320px;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  hyphens: auto;
  word-wrap: break-word;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: clamp(1.5rem, 5vw, 3rem);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
`;

const CardBody = styled.div`
  position: relative;
  z-index: 2;
`;

const Glow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const CardTitle = styled.h2`
  color: turquoise;
  font-size: clamp(2.6rem, 7vw, 5.6rem);
  margin: 0 0 1.2rem;
  text-transform: uppercase;
  line-height: 1.05;
  font-weight: 900;
  min-height: 2.4em; /* Reserve space for two lines to avoid jump */
`;

const TitleLine = styled.span`
  display: block;
  min-height: 1.15em; /* Keep per-line height stable */
  line-height: 1.1;
  white-space: nowrap; /* Prevent wrapping of a single title line */
  font-size: clamp(2rem, 6.5vw, 5.2rem);
`;

const CardText = styled.p`
  color: white;
  font-size: clamp(1.1rem, 2.2vw, 1.7rem);
  line-height: 1.65;
  margin: 0;
  max-width: 700px;
`;

const ParallaxElement = ({ children, offset = 30, style }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [offset, -offset]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        position: 'absolute',
        willChange: 'transform',
        ...style,
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};

ParallaxElement.propTypes = {
  children: PropTypes.node,
  offset: PropTypes.number,
  style: PropTypes.object,
};

const scrambleChars = '!+-_\\|;:.,';

const ScrambleText = ({ text, duration = 800, trigger }) => {
  const prefersReducedMotion = useReducedMotion();
  const [output, setOutput] = useState(text);
  const [scrambleKey, setScrambleKey] = useState(0);
  const chars = useMemo(() => text.split(''), [text]);

  // Restart scramble at intervals to keep a subtle ambient effect
  useEffect(() => {
    if (!trigger || prefersReducedMotion) return undefined;
    const interval = setInterval(() => setScrambleKey((k) => k + 1), 5000);
    return () => clearInterval(interval);
  }, [trigger, prefersReducedMotion]);

  useEffect(() => {
    if (!trigger || prefersReducedMotion) {
      setOutput(text);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const scramble = () => {
      const now = performance.now();
      const t = Math.min(1, (now - start) / duration);
      const next = chars.map((ch, idx) => {
        const ready = t >= idx / chars.length;
        if (ready) return ch;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      });
      setOutput(next.join(''));
      if (t < 1) {
        frame = requestAnimationFrame(scramble);
      }
    };
    frame = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frame);
  }, [trigger, duration, chars, text, prefersReducedMotion, scrambleKey]);

  return <span aria-hidden="true">{output}</span>;
};

ScrambleText.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trigger: PropTypes.bool,
};

const About = () => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [seen, setSeen] = useState([false, false, false]);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springX = useSpring(glowX, { stiffness: 140, damping: 18, mass: 0.35 });
  const springY = useSpring(glowY, { stiffness: 140, damping: 18, mass: 0.35 });
  const glowBackground = useMotionTemplate`
    radial-gradient(
      circle at ${springX}% ${springY}%,
      rgba(64, 224, 208, 0.16),
      transparent 70%
    )
  `;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '-65%']
  );

  const handleGlowMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    glowX.set(x);
    glowY.set(y);
  };

  const handleGlowLeave = () => {
    glowX.set(50);
    glowY.set(50);
  };

  const markSeen = (index) =>
    setSeen((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });

  return (
    <MainSection ref={targetRef} id="about">
      <StickyWrapper>
        <HorizontalContainer style={{ x }}>
          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            onMouseMove={handleGlowMove}
            onMouseLeave={handleGlowLeave}
            onViewportEnter={() => markSeen(0)}
          >
            <ParallaxElement
              offset={20}
              style={{
                right: '5%',
                top: '6%',
                fontSize: '6rem',
                color: 'turquoise',
                opacity: 0.06,
                fontWeight: 900,
              }}
            >
              0101
            </ParallaxElement>
            <Glow style={{ background: glowBackground }} />
            <CardBody>
              <CardTitle>
                <TitleLine>
                  <ScrambleText text="Who is" trigger={seen[0]} duration={700} />
                </TitleLine>
                <TitleLine>
                  <ScrambleText text="Niko?" trigger={seen[0]} duration={820} />
                </TitleLine>
              </CardTitle>
              <CardText>
                ICT student laser-focused on <b>Full-Stack Development</b> and <b>Cybersecurity</b>.
                Building secure, performant apps is the core of what I do.
              </CardText>
            </CardBody>
          </ContentCard>

          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
            viewport={{ once: true, margin: '-100px' }}
            onMouseMove={handleGlowMove}
            onMouseLeave={handleGlowLeave}
            onViewportEnter={() => markSeen(1)}
          >
            <ParallaxElement
              offset={26}
              style={{
                left: '-4%',
                bottom: '10%',
                fontSize: '7rem',
                color: '#2dd4bf',
                opacity: 0.08,
                fontWeight: 900,
              }}
            >
              &lt;/&gt;
            </ParallaxElement>
            <Glow style={{ background: glowBackground }} />
            <CardBody>
              <CardTitle>
                <TitleLine>
                  <ScrambleText text="The" trigger={seen[1]} duration={650} />
                </TitleLine>
                <TitleLine>
                  <ScrambleText text="Developer" trigger={seen[1]} duration={850} />
                </TitleLine>
              </CardTitle>
              <CardText>
                React, Node.js, and Java Spring for front-to-back delivery.
                From MongoDB to PostgreSQL, I design data that stays consistent and fast.
              </CardText>
            </CardBody>
          </ContentCard>

          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.16 }}
            viewport={{ once: true, margin: '-100px' }}
            onMouseMove={handleGlowMove}
            onMouseLeave={handleGlowLeave}
            onViewportEnter={() => markSeen(2)}
          >
            <ParallaxElement
              offset={24}
              style={{
                right: '-2%',
                bottom: '8%',
                fontSize: '6.4rem',
                color: '#f87171',
                opacity: 0.07,
                fontWeight: 800,
              }}
            >
              &gt;_
            </ParallaxElement>
            <Glow style={{ background: glowBackground }} />
            <CardBody>
              <CardTitle>
                <TitleLine>
                  <ScrambleText text="The Cyber" trigger={seen[2]} duration={700} />
                </TitleLine>
                <TitleLine>
                  <ScrambleText text="Enthusiast" trigger={seen[2]} duration={900} />
                </TitleLine>
              </CardTitle>
              <CardText>
                Ethical hacking and red team mindset with Kali Linux tooling.
                Continuously sharpening reconnaissance and exploitation skills to stay ahead of threats.
              </CardText>
            </CardBody>
          </ContentCard>
        </HorizontalContainer>
      </StickyWrapper>
    </MainSection>
  );
};

export default About;
