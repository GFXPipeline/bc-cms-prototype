import React from "react";
import styled from "styled-components";

const LoadSpinnerContainer = styled.div`
  // From https://github.com/lukehaas/css-loaders/blob/step2/css/load7.css
  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: pulse 1.2s infinite ease-in-out;
    animation: pulse 1.2s infinite ease-in-out;
  }
  .loader {
    color: #d6d6d6;
    font-size: 10px;
    margin: 20px auto 70px auto;
    position: relative;
    -webkit-animation-delay: -0.12s;
    animation-delay: -0.12s;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.24s;
    animation-delay: -0.24s;
  }
  .loader:after {
    left: 3.5em;
  }
  @-webkit-keyframes pulse {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
  @keyframes pulse {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`;

function LoadSpinner() {
  return (
    <LoadSpinnerContainer>
      <div className="loader" />
    </LoadSpinnerContainer>
  );
}

export default LoadSpinner;
