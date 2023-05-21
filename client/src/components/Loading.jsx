import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <Wrapper>
      {/* <p>Loading<span class="loading"></span></p> */}
      <div className="wave">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  background-color: var(--blue2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-content: center;
  /* .loading {
    animation:extend 3s steps(3, end) infinite;
    display:inline-block;
    overflow:hidden;
    vertical-align:bottom;
    &:before {
      content:"...";
    }
  }

  @keyframes extend {
    0% {
      width:.25em;
    }
    100% {
      width:1em;
    }
  } */
  .wave {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ball {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin: 0 10px;
    background-color: #000;
    animation: wave 1s ease-in-out infinite;
  }

  @keyframes wave {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .ball:nth-child(2) {
    animation-delay: -0.2s;
  }

.ball:nth-child(3) {
  animation-delay: -0.4s;
}

.ball:nth-child(4) {
  animation-delay: -0.6s;
}

.ball:nth-child(5) {
  animation-delay: -0.8s;
}

`

