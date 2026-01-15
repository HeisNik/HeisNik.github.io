import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const ContactSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 150px 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 clamp(6vw, 8vw, 10vw);
`;

const TerminalHeader = styled.div`
  margin-bottom: 50px;
  border-left: 4px solid turquoise;
  padding-left: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-family: monospace;
  color: #444;
  font-size: 0.8rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const baseField = `
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #222;
  padding: 15px 0;
  color: white;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-bottom: 1px solid turquoise;
    box-shadow: 0 10px 20px -10px rgba(64, 224, 208, 0.3);
  }
`;

const StyledInput = styled.input`
  ${baseField}
`;

const StyledTextArea = styled.textarea`
  ${baseField}
  min-height: 150px;
  resize: none;
`;

const SubmitButton = styled(motion.button)`
  margin-top: 50px;
  background: transparent;
  color: turquoise;
  border: 1px solid turquoise;
  padding: 20px 40px;
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background: turquoise;
    color: black;
    box-shadow: 0 0 30px turquoise;
    animation: ${glitch} 0.3s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: monospace;
  font-size: 0.7rem;
  color: #333;
  margin-top: 20px;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 40px;
  font-family: monospace;
  color: #333;
  font-size: 0.8rem;
`;

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const latency = useTransform(scrollYProgress, [0, 1], ['42ms', '18ms']);
  const packetLoss = useTransform(scrollYProgress, [0, 1], ['0.7%', '0.1%']);
  const throughput = useTransform(scrollYProgress, [0, 1], ['1.2 Gbps', '2.4 Gbps']);

  return (
    <ContactSection id="contact" ref={ref}>
      <InnerWrapper>
        <TerminalHeader>
          <span style={{ color: 'turquoise', fontFamily: 'monospace' }}>
            {'// INITIATE_UPLINK'}
          </span>
          <h2
            style={{
              color: 'white',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Contact
          </h2>
        </TerminalHeader>

        <Form>
          <InputGroup>
            <Label>User_Identity</Label>
            <StyledInput type="text" placeholder="NAME" required />
          </InputGroup>

          <InputGroup>
            <Label>Return_Address</Label>
            <StyledInput type="email" placeholder="EMAIL" required />
          </InputGroup>

          <InputGroup>
            <Label>Data_Payload</Label>
            <StyledTextArea placeholder="MESSAGE_BODY" required />
          </InputGroup>

          <SubmitButton
            whileHover={{ skewX: -5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            type="submit"
          >
            Send_Signal
          </SubmitButton>
        </Form>

        <StatusIndicator>
          <div
            style={{
              width: 8,
              height: 8,
              background: 'turquoise',
              borderRadius: '50%',
              boxShadow: '0 0 10px turquoise',
            }}
          />
          ENCRYPTED_CONNECTION_ACTIVE
        </StatusIndicator>

        <MetaGrid>
          <div>
            LATENCY: <motion.span style={{ color: 'turquoise' }}>{latency}</motion.span>
          </div>
          <div>
            PKT_LOSS: <motion.span style={{ color: 'turquoise' }}>{packetLoss}</motion.span>
          </div>
          <div>
            THROUGHPUT: <motion.span style={{ color: 'turquoise' }}>{throughput}</motion.span>
          </div>
        </MetaGrid>
      </InnerWrapper>
    </ContactSection>
  );
};

export default Contact;
