import React from 'react'
import styled, { keyframes } from 'styled-components'

const rainbow = keyframes`
  0% { background-color: red; }
  14% { background-color: orange; }
  28% { background-color: yellow; }
  42% { background-color: green; }
  57% { background-color: blue; }
  71% { background-color: indigo; }
  85% { background-color: violet; }
  100% { background-color: red; }
`

const textAnimation = keyframes`
  0% { transform: scale(1); color: white; }
  25% { transform: scale(1.5); color: yellow; }
  50% { transform: scale(2); color: cyan; }
  75% { transform: scale(1.5); color: magenta; }
  100% { transform: scale(1); color: white; }
`

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  animation: ${rainbow} 10s linear infinite;
  position: relative;
  overflow: hidden;
`

const Name = styled.h1`
  font-size: 4rem;
  text-align: center;
  animation: ${textAnimation} 5s ease-in-out infinite;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    animation: ${textAnimation} 7s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    animation: ${textAnimation} 10s ease-in-out infinite;
  }
`

const App = () => {
  return (
    <FullPage>
      <Name>Brenden Bissessar is best</Name>
    </FullPage>
  )
}

export default App
