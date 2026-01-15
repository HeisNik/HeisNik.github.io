import styled from 'styled-components';
import { motion } from 'framer-motion';

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 100px;
  width: 100%;
`;

const SocialNode = styled.a`
  text-decoration: none;
  border: 1px solid #111;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    border-color: ${({ $color }) => $color};
    background: ${({ $color }) => `${$color}05`};
    transform: translateY(-5px);
  }

  &:before {
    content: "DB_REF";
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 0.5rem;
    color: #222;
    font-family: monospace;
  }
`;

const NodeTitle = styled.span`
  font-family: monospace;
  font-size: 0.7rem;
  color: #444;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const NodeValue = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 1px;
`;

const Socials = () => (
  <SocialGrid>
    <SocialNode href="https://github.com/HeisNik" target="_blank" rel="noreferrer" $color="turquoise">
      <NodeTitle>Storage_Vault</NodeTitle>
      <NodeValue>GITHUB</NodeValue>
      <motion.div
        className="glitch-line"
        initial={{ opacity: 0, top: '0%' }}
        whileHover={{ opacity: 0.2, top: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'turquoise',
        }}
      />
    </SocialNode>

    <SocialNode href="https://linkedin.com/in/niko-heiskanen-47a54a2a8" target="_blank" rel="noreferrer" $color="#0077b5">
      <NodeTitle>Professional_Network</NodeTitle>
      <NodeValue>LINKEDIN</NodeValue>
    </SocialNode>

    <SocialNode href="mailto:heiskanen.niko@outlook.com" $color="#f87171">
      <NodeTitle>Direct_Comms</NodeTitle>
      <NodeValue>EMAIL_ADDR</NodeValue>
    </SocialNode>
  </SocialGrid>
);

export default Socials;

