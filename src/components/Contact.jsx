import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

// Contact data array
const contacts = [
  { 
    name: 'GitHub', 
    Icon: FaGithub, 
    color: '#FFFFFF', 
    href: 'https://github.com/HeisNik',
    label: 'GitHub'
  },
  { 
    name: 'LinkedIn', 
    Icon: FaLinkedin, 
    color: '#0077B5', 
    href: 'https://www.linkedin.com/in/niko-heiskanen-47a54a2a8/',
    label: 'Linkedin'
  },
  { 
    name: 'Email', 
    Icon: MdOutlineMailOutline, 
    color: '#40E0D0', 
    href: 'mailto:nikoheiska@icloud.com',
    label: 'nikoheiska@icloud.com'
  }
];

const ContactWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 50px;
  box-sizing: border-box;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    margin-bottom: 100px;
  }
`;

const Header = styled.h1`
  color: turquoise;
  width: 100%;
  text-align: center;
  font-size: 5.2em;
  margin: 75px auto 50px;

  @media (min-width: 768px) {
    margin: 150px auto 100px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const ContactIconWrapper = styled.div`
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
`;

const ContactLink = styled.a`
  color: #ff4081;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// ContactIcon component
const ContactIcon = ({ name, Icon, color, href, label }) => (
  <ContactIconWrapper>
    <ContactLink href={href} target={href.startsWith('mailto:') ? undefined : '_blank'}>
      <Icon size={75} color={color} />
    </ContactLink>
    <p>{label}</p>
  </ContactIconWrapper>
);

const Contact = () => {
  return (
    <ContactWrapper id='contact'>
      <ContactContainer>
        <Header>Connect</Header>
        <IconWrapper>
          {contacts.map((contact, index) => (
            <ContactIcon
              key={index}
              name={contact.name}
              Icon={contact.Icon}
              color={contact.color}
              href={contact.href}
              label={contact.label}
            />
          ))}
        </IconWrapper>
      </ContactContainer>
    </ContactWrapper>
  );
};

export default Contact;
