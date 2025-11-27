import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 50px;
  box-sizing: border-box;
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  row-gap: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    row-gap: 40px;
    column-gap: 20px;
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`;

const ProjectCard = styled.div`
  background-color: #282c34;
  color: white;
  border-radius: 20px;
  padding: 20px;
  width: 300px;
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Header = styled.h1`
  color: turquoise;
  width: 100%;
  text-align: center;
  font-size: 5.2em;
  margin: 75px auto 100px;

  @media (min-width: 768px) {
    margin: 150px auto 200px;
  }
`;

const ProjectTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  margin-bottom: 20px;
`;

const ProjectLink = styled.a`
  color: #ff4081;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #ff4081;
  }
`;

const Projects = () => (
<SectionContainer id='projects'>
    <Header>Projects</Header>
  <ProjectsContainer>
  <ProjectCard>
      <ProjectTitle>Property App</ProjectTitle>
      <ProjectDescription>This <b>Java</b> application, built with <b>Spring Boot</b> and <b>PostgreSQL</b>. 
        Users can upload property images and store information in a PostgreSQL database, while images are saved to the server&apos;s filesystem. 
        The project features user authentication and authorization via <b>Spring Security</b>, ensuring that only authorized users can modify or delete properties.
    </ProjectDescription>
      <ProjectLink href="https://github.com/HeisNik/propertyAppBackend" target="_blank">View Backend</ProjectLink> <br />
      <ProjectLink href="https://github.com/HeisNik/propertyAppFrontend" target="_blank">View Frontend</ProjectLink>
    </ProjectCard>
    <ProjectCard>
      <ProjectTitle>Album App</ProjectTitle>
      <ProjectDescription>This is a <b>Node.js</b> application built with Express and <b>MongoDB</b>. 
        The app allows users to add and manage their favorite music albums. Users can easily input album details, which are then stored in a MongoDB database.
        The project was tested using <b>Jest</b> to ensure reliability and performance.
        </ProjectDescription>
      <ProjectLink href="https://github.com/HeisNik/wsp-renderApp" target="_blank">View Project</ProjectLink>
    </ProjectCard>
    <ProjectCard>
      <ProjectTitle>Anecdote Sharing App</ProjectTitle>
      <ProjectDescription>This is a <b>React</b> application where users can post and vote on anecdotes.
      The state management is implemented using <b>Redux</b>, ensuring a smooth and efficient user experience.
      Users can submit their own anecdotes, view anecdotes posted by others, and vote on their favorites. 
         </ProjectDescription>
      <ProjectLink href="https://github.com/HeisNik/fullstack-palautus/tree/main/osa6/redux-anecdotes" target="_blank">View Project</ProjectLink>
    </ProjectCard>
    <ProjectCard>
      <ProjectTitle>Vehicle App</ProjectTitle>
      <ProjectDescription>This is a <b>Node.js</b> application built with <b>Express</b> and <b>GraphQL</b>. 
        The app allows users to add and manage vehicles. Logged-in users can create, edit, delete, or deactivate vehicles. 
        Vehicle information is stored in a <b>PostgreSQL</b> database, ensuring data integrity and reliability.
    </ProjectDescription>
      <ProjectLink href="https://github.com/HeisNik/vehicleApp" target="_blank">View Backend</ProjectLink>
    </ProjectCard>
    <ProjectCard>
      <ProjectTitle>Fishing Social Media App</ProjectTitle>
      <ProjectDescription>This is a work-in-progress social media application for fishing enthusiasts.
      Users can create posts featuring their fishing experiences, including photos of their catches and the locations where they caught the fish.
      Other users can search for popular fishing spots and get tips on fishing techniques.
         </ProjectDescription>
      <ProjectLink href="https://github.com/HeisNik/anglersApp" target="_blank">View Frontend</ProjectLink> <br />
      <ProjectLink href="https://github.com/HeisNik/anglerAppBackend" target="_blank">View Backend</ProjectLink>
    </ProjectCard>
    <ProjectCard>
      <ProjectTitle>Cybersecurity Toolkit</ProjectTitle>
      <ProjectDescription>This is a comprehensive <b>cybersecurity</b> application developed in <b>C#</b>.
      The application includes several essential tools for enhancing security: <br />
      Password Hashing Tool <br />
      Port Scanner <br />
      File Encryption and Decryption Tool <br />
      Keylogger Tool
         </ProjectDescription>
      <ProjectLink href="https://github.com/HeisNik/cryptDefender" target="_blank">View Project</ProjectLink>
    </ProjectCard>
  </ProjectsContainer>
  </SectionContainer>
);

export default Projects;
