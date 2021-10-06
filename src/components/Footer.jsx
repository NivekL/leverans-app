import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <div>
      <FooterCon>
        <p>&copy; {new Date().getFullYear()} - Designed & Built by</p>
        <p> Sofia, Igor, Kevin, Oscar, Alexander, Bryan</p>
        <a href="https://github.com/NivekL/leverans-app">Watches</a>
      </FooterCon>
    </div>
  );
}

const FooterCon = styled.div`
  height: 10vh;
  background-color: #222;
  text-align: center;
  color: white;
  font-family: 'Libre Franklin', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;

  a {
    text-decoration: none;
    color: skyblue;
    font-weight: bold;
  }
`;

export default Footer;
