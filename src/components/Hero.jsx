import { blue, blueGrey } from "@mui/material/colors"
import { color } from "framer-motion"
import { div } from "framer-motion/client"
import React from 'react';
import styled from 'styled-components';



const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%; 
  max-width: 1200px; 
  margin: 40px auto;
  
  

  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 150px;
    gap: 150px;
    padding: 150px 20px 20px 20px; 
  }
`;

const Text = styled.h1`
  color: turquoise;

   @media (min-width: 768px) {
    width: 80%;
  max-width: 600px;
  }
  
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(1.2, 1.2, 1.2, 1.2);
  transition: box-shadow 0.6s ease-in-out;

  &:hover {
    box-shadow: 0 16px 16px rgba(1.2, 1.2, 1.2, 1.2);
  }
`;

const Hero = () => {
    return (
    <div id="hero">
    <HeroContainer>
      <Text>
        <b style={{ color: "white" }}>I'm Niko Heiskanen</b> <br /> Full Stack Developer <b style={{ color: "white" }}>and</b> <b style={{ color: "red" }}>Cyber Security Enthusiast</b>
      </Text>
      <Image src={`/images/IMG_9916.jpg`} alt="Description" />
    </HeroContainer>
    </div>
)}

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