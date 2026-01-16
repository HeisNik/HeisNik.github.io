import { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ContactWrapper = styled.section`
  position: relative;
  min-height: 120vh;
  background: #000;
  padding: 100px 0;
  overflow: hidden;
  /* CRT-monitorin hienovarainen välke */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 4px, 3px 100%;
    z-index: 10;
    pointer-events: none;
  }
`;

const TerminalWindow = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(5, 5, 5, 0.9); /* Hieman tummempi kontrasti */
  border: 1px solid turquoise;
  padding: 40px;
  position: relative;
  box-shadow: 0 0 40px rgba(64, 224, 208, 0.1);
  z-index: 2;

  /* Estetään hakasulkeiden paukunta reunoista yli mobiilissa */
  @media (max-width: 768px) {
    padding: 30px 25px;
    margin: 0 15px;
  }
`;

const TerminalHeader = styled.div`
  margin-bottom: clamp(30px, 8vw, 60px);
  border-left: 4px solid turquoise;
  padding-left: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding-left: 15px;
    border-left-width: 2px;
  }
`;

// Tehdään otsikosta oma styled-komponentti, jotta clamp toimii varmasti
const ResponsiveH2 = styled.h2`
  color: white;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 0.9;
  letter-spacing: -1px;
  position: relative;
  
  /* TÄMÄ ON SE KORJAUS: 
     Nostetaan vw-kerrointa (20vw) ja lasketaan minimiä (1.2rem).
     Nyt se pienenee salamannopeasti! */
  font-size: clamp(1.2rem, 6vw, 4rem); 

  &::after {
    content: 'CONTACT_ME';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: turquoise;
    opacity: 0.15;
    z-index: -1;
    transform: translate(4px, 4px);
    filter: blur(1px);
  }

  @media (max-width: 480px) {
    letter-spacing: -0.5px; /* Helpompi luku mobiilissa */
  }
`;

const InputBrackets = styled.div`
  position: relative;
  margin-bottom: 30px;
  
  &:before { 
    content: "["; 
    position: absolute; 
    left: -15px; 
    top: 15px; 
    color: turquoise; 
    opacity: 0.5; 
    font-family: monospace;
    font-size: 1.2rem;
  }
  &:after { 
    content: "]"; 
    position: absolute; 
    right: -15px; 
    top: 15px; 
    color: turquoise; 
    opacity: 0.5; 
    font-family: monospace;
    font-size: 1.2rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #222;
  padding: 15px 0;
  color: white;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-bottom: 1px solid turquoise;
    box-shadow: 0 10px 20px -10px rgba(64, 224, 208, 0.3);
  }

  &::placeholder {
    color: #444;
    font-family: monospace;
    text-transform: uppercase;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #222;
  padding: 15px 0;
  color: white;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  transition: all 0.3s;
  min-height: 150px;
  resize: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid turquoise;
    box-shadow: 0 10px 20px -10px rgba(64, 224, 208, 0.3);
  }

  &::placeholder {
    color: #444;
    font-family: monospace;
    text-transform: uppercase;
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 30px;
  background: transparent;
  color: turquoise;
  border: 1px solid turquoise;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: monospace;
  width: 100%;

  &:hover:not(:disabled) {
    background: turquoise;
    color: black;
    box-shadow: 0 0 30px turquoise;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SignalSocials = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 50px;
`;

const SocialLink = styled(motion.a)`
  border: 1px solid #222;
  padding: 15px;
  text-decoration: none;
  font-family: monospace;
  font-size: 0.7rem;
  color: #555;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover {
    color: ${({ $color }) => $color};
    border-color: ${({ $color }) => $color};
    background: ${({ $color }) => `${$color}05`};
  }
`;

const GlitchOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 2rem;
  color: turquoise;
  text-transform: uppercase;
`;

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Vääristetään terminaalia skrollatessa (kuten projekteissa)
  const skewX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setShowGlitch(true);
    
    // Glitch-efekti kestää 1 sekunnin
    setTimeout(() => {
      setShowGlitch(false);
      setIsSending(false);
    }, 1000);
  };

  const socialLinks = [
    { label: 'GITHUB_VAULT', href: 'https://github.com/HeisNik', color: 'turquoise' },
    { label: 'LINKEDIN_NODE', href: 'https://linkedin.com/in/niko-heiskanen-47a54a2a8', color: '#0077b5' },
    { label: 'DIRECT_COMMS', href: 'mailto:heiskanen.niko@outlook.com', color: '#f87171' },
  ];

  return (
    <>
      <ContactWrapper ref={containerRef} id="contact">
        <TerminalWindow style={{ skewX, rotateX }}>
          {/* Skannausviiva */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: '2px', 
              background: 'turquoise', 
              opacity: 0.2, 
              zIndex: 11 
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          <TerminalHeader>
            <span style={{ color: 'turquoise', fontFamily: 'monospace', fontSize: '0.7rem', display: 'block', marginBottom: '10px' }}>
              {'// INITIATE_TERMINAL_UPLINK'}
            </span>
            <ResponsiveH2>CONTACT_ME</ResponsiveH2>
          </TerminalHeader>

          <form onSubmit={handleSubmit}>
            <InputBrackets>
              <StyledInput type="text" placeholder="USER_NAME" required />
            </InputBrackets>
            
            <InputBrackets>
              <StyledInput type="email" placeholder="EMAIL_ENCRYPTED" required />
            </InputBrackets>

            <InputBrackets>
              <StyledTextArea placeholder="TRANSCEIVE_MESSAGE..." required />
            </InputBrackets>

            <SubmitButton 
              type="submit"
              disabled={isSending}
              animate={isSending ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {isSending ? 'SENDING_PULSE...' : 'INITIATE_TRANSMISSION'}
            </SubmitButton>
          </form>

          {/* SOSIAALISET NODET */}
          <SignalSocials>
            {socialLinks.map((link) => (
              <SocialLink 
                key={link.label}
                href={link.href} 
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                $color={link.color}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </SocialLink>
            ))}
          </SignalSocials>
        </TerminalWindow>
        
        {/* HUD-DATAA RUUDUN REUNOILLA */}
        <aside style={{ 
          position: 'absolute', 
          right: '5%', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          writingMode: 'vertical-rl', 
          color: '#111', 
          fontFamily: 'monospace', 
          fontSize: 'clamp(2rem, 8vw, 4rem)', 
          fontWeight: 900, 
          pointerEvents: 'none',
          zIndex: 1
        }}>
          CONNECTION_STREAM_ACTIVE
        </aside>
      </ContactWrapper>

      {/* FULL SCREEN GLITCH */}
      {showGlitch && (
        <GlitchOverlay
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            clipPath: [
              'inset(0 0 0 0)',
              'inset(20% 0 60% 0)',
              'inset(60% 0 20% 0)',
              'inset(0 0 0 0)'
            ]
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          SIGNAL_TRANSMITTED
        </GlitchOverlay>
      )}
    </>
  );
};

export default Contact;
