import React from 'react';
import styled from 'styled-components';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";


const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  border-radius: 10px;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 1.1);
`;

const Header = styled.h1`
  color: turquoise;
  margin: 70px auto 20px;
  font-size: 5.2em;
  text-align: center;
`;


const IconWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    transition: transform 0.3s, color 0.3s;

    &:hover {
      transform: scale(1.2);
      color: #ff4081;
    }

    svg {
      margin-bottom: 10px;
    }
  }
`;

const ContactLink = styled.a`
  color: #ff4081;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Contact = () => {
  return (
    <ContactContainer id='contact'>
      <Header>Connect</Header>
    <IconWrapper>
      <div>
        <ContactLink href="https://github.com/HeisNik" target="_blank"><FaGithub size={75} color='#FFFFFF' /></ContactLink>
        <p>GitHub</p>
      </div>
    </IconWrapper>
    <IconWrapper>
      <div>
        <ContactLink href="https://www.linkedin.com/in/niko-heiskanen-47a54a2a8/" target="_blank"><FaLinkedin size={75} color="#0077B5" /></ContactLink>
        <p>Linkedin</p>
      </div>
    </IconWrapper>
    <IconWrapper>
        <div>
          <ContactLink href="mailto:nikoheiska@icloud.com">
            <MdOutlineMailOutline size={75} color='#40E0D0' />
          </ContactLink>
          <p>nikoheiska@icloud.com</p>
        </div>
      </IconWrapper>
    </ContactContainer>
  );
};

export default Contact;