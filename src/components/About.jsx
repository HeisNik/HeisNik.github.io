import { div } from "framer-motion/client"
import styled from 'styled-components';


const CardContainer = styled.div`
  padding-top: 50px;
`;

const AboutContainer = styled.div`
  align-items: center;
  justify-content: center;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  
  

  @media (min-width: 768px) {
  margin: 20px;
  padding: 25px 0 50px;
    
    
  }
`;

const Header = styled.h1`
  color: turquoise;
  width: 100%;
  text-align: center;
  
  font-size: 5.2em;
 
`;

const Text = styled.div`
  color: white;
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  font-size: 1.4em;
`;

const About = () => {
    return (
            <CardContainer id="about">
            <AboutContainer >
            <Header>About me</Header>
            <Text>
            I am an Information and Communication Technology student with a strong passion for full-stack application development and cybersecurity. 
My experience spans modern technologies such as React for frontend development, Node.js for backend development, and Java Spring for robust server-side applications. 
I have built production-ready applications and deployed them on platforms like Render and Azure. Additionally, I have hands-on experience with databases, including MongoDB and PostgreSQL. 
</Text>
<Text>
In the realm of cybersecurity, I am particularly drawn to ethical hacking and red team operations. I have worked with Kali Linux to configure training environments and leverage its tools for reconnaissance and exploitation. 
I actively keep up with the latest cybersecurity trends and techniques to enhance my ability to identify and mitigate potential threats effectively. 
My commitment to growth in this field is exemplified by my independent studies of Cisco cybersecurity courses, such as <i>Introduction to Cyber Security</i> and <i>Ethical Hacking</i>.
</Text>
            </AboutContainer>
            </CardContainer>
    )
}

export default About