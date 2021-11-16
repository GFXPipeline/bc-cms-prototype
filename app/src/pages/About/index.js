import styled from "styled-components";

import { ReactComponent as ReactLogo } from "../../assets/logo-react.svg";
import { ReactComponent as NodeJsLogo } from "../../assets/logo-nodejs.svg";
import ExpressLogo from "../../assets/logo-express.png";
import { ReactComponent as PostgresLogo } from "../../assets/logo-postgresql.svg";
import GitHubLogo from "../../assets/logo-github.png";
import { ReactComponent as HerokuLogo } from "../../assets/logo-heroku.svg";

const Page = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
`;

const StyledDiv = styled.div`
  color: #313132;
  max-width: 600px;

  h1 {
    font-size: 36px;
  }

  a.tech {
    align-items: center;
    background-color: white;
    border: 1px solid black;
    box-shadow: 2px 2px 6px #00000029;
    color: #313132;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
    margin-left: 0px;
    padding: 8px 16px;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    transform: rotate(0deg);
    width: 100%;

    &:hover {
      margin-left: 10px;
    }

    div.label {
      align-items: flex-start;
      display: flex;
      flex-direction: column;

      span {
        display: block;
        font-size: 18px;
      }
    }

    div.logo {
      display: flex;
      flex-direction: column;

      img,
      svg {
        display: block;
        max-height: 80px;
        width: 120px;
      }
    }
  }
`;

function About() {
  return (
    <Page>
      <StyledDiv>
        <h1>About this prototype</h1>
        <h2>Technologies</h2>
        <a className="tech" href="https://reactjs.org/">
          <div className="label">
            <span>Front-end:</span>
            <span>
              <strong>React</strong>
            </span>
          </div>
          <div className="logo">
            <ReactLogo id="react" />
          </div>
        </a>
        <a className="tech" href="https://expressjs.com/">
          <div className="label">
            <span>Back-end:</span>
            <span>
              <strong>Node.js/Express</strong>
            </span>
          </div>
          <div className="logo">
            <NodeJsLogo />
            <img src={ExpressLogo} alt="" />
          </div>
        </a>
        <a className="tech" href="https://www.postgresql.org/">
          <div className="label">
            <span>Database:</span>
            <span>
              <strong>PostgreSQL</strong>
            </span>
          </div>
          <div className="logo">
            <PostgresLogo />
          </div>
        </a>
        <a className="tech" href="https://github.com/ty2k/bc-cms-prototype">
          <div className="label">
            <span>Code repository:</span>
            <span>
              <strong>GitHub</strong>
            </span>
          </div>
          <div className="logo">
            <img src={GitHubLogo} alt="" />
          </div>
        </a>
        <a className="tech" href="https://www.heroku.com/home">
          <div className="label">
            <span>Host:</span>
            <span>
              <strong>Heroku</strong>
            </span>
          </div>
          <div className="logo">
            <HerokuLogo />
          </div>
        </a>
      </StyledDiv>
    </Page>
  );
}

export default About;
