import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiKalilinux } from 'react-icons/si';

const CircuitSection = styled.section`
  width: 100%;
  padding: 100px 0;
  background: #050505;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const CircuitContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SVGBackground = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const ConnectionLine = styled(motion.path)`
  fill: none;
  stroke: ${({ $active, $color }) => ($active ? $color : '#222')};
  stroke-width: 2;
  transition: stroke 0.4s ease;
`;

const Node = styled(motion.div)`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon-box {
    width: 80px;
    height: 80px;
    background: #0a0a0a;
    border: 1px solid ${({ $active, $color }) => ($active ? $color : '#333')};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ $active, $color }) =>
      $active ? `0 0 30px ${$color}44` : 'none'};
    transition: all 0.3s ease;
  }

  p {
    color: ${({ $active }) => ($active ? 'white' : '#555')};
    font-family: monospace;
    font-size: 0.8rem;
    margin-top: 10px;
    text-transform: uppercase;
  }
`;

const skills = [
  { id: 'react', name: 'React', Icon: FaReact, color: '#61dafb', x: 20, y: 30, connects: ['node'] },
  { id: 'node', name: 'Node.js', Icon: FaNodeJs, color: '#68a063', x: 50, y: 50, connects: ['postgres', 'docker'] },
  { id: 'postgres', name: 'Postgres', Icon: BiLogoPostgresql, color: '#336791', x: 80, y: 30, connects: [] },
  { id: 'docker', name: 'Docker', Icon: FaDocker, color: '#0077B5', x: 80, y: 70, connects: [] },
  { id: 'kali', name: 'Kali', Icon: SiKalilinux, color: '#ffffff', x: 20, y: 70, connects: ['node'] },
];

const SkillsCircuit = () => {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <CircuitSection id="skills-circuit">
      <CircuitContainer>
        <SVGBackground>
          {skills.map((node) =>
            node.connects.map((targetId) => {
              const target = skills.find((n) => n.id === targetId);
              if (!target) return null;
              const isActive = activeNode === node.id || activeNode === targetId;
              const color = isActive
                ? activeNode === node.id
                  ? node.color
                  : target.color
                : '#222';
              return (
                <ConnectionLine
                  key={`${node.id}-${targetId}`}
                  $active={isActive}
                  $color={color}
                  d={`M ${node.x}% ${node.y}% L ${target.x}% ${target.y}%`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              );
            })
          )}
        </SVGBackground>

        {skills.map((node) => (
          <Node
            key={node.id}
            $color={node.color}
            $active={activeNode === node.id}
            style={{ left: `${node.x}%`, top: `${node.y}%`, x: '-50%', y: '-50%' }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-box">
              <node.Icon size={40} color={activeNode === node.id ? node.color : '#555'} />
            </div>
            <p>{node.name}</p>
          </Node>
        ))}
      </CircuitContainer>
    </CircuitSection>
  );
};

export default SkillsCircuit;

