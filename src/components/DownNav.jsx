import React, {useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserLogin from './UserLogin';
import { ThemeContext } from '../App';

function DownNav({ open, setOpen, isLoggedIn, setIsLoggedIn }) {

  const theme = useContext(ThemeContext);
  const styles = {
    backgroundColor: theme ? "white" : "#202124",
    color: theme ? "black" : "white",
  }
  const para = {
    color: theme ? "black" : "white",
  }

  return (
    <MenuWrapper open={open} style={styles}>
      <Ul>
        <h3 style={para}>Kategorier</h3>
        <li>
          <MenuLink to="/LondonClassic" onClick={() => setOpen(!open)} style={para}>
            Classic
          </MenuLink>
        </li>
        <li>
          <MenuLink to="/StMoritzSport" onClick={() => setOpen(!open)} style={para}>
            Sport
          </MenuLink>{' '}
        </li>
        <li>
          <MenuLink to="/DubaiLuxury" onClick={() => setOpen(!open)} style={para}>
            Luxury
          </MenuLink>
        </li>
        <Link to="/" className="showAllLink" onClick={() => setOpen(!open)} style={para}>
          visa alla{' '}
        </Link>
      </Ul>
      <UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </MenuWrapper>
  );
}

export default DownNav;

// Styled ----------------------------------------------------------------------
const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 4rem;
  left: 0;
  height: 17.4rem;
  width: 100%;
  padding-top: 2rem;
  padding-left: 1rem;
  background-color: whitesmoke;
  color: #292929;
  font-family: 'Libre Franklin', sans-serif;
  transform: ${({ open }) => (open ? 'translatex(0)' : 'translateY(-140%)')};
  transition: transform 0.3s ease-in-out;

  h3 {
    margin-bottom: 1.2rem;
    font-size: 0.8rem;
    font-weight: 200;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  color: #292929;

  &:hover {
    border-bottom: 3px solid #292929;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  flex-flow: column nowrap;

  li {
    padding-bottom: 1rem;
  }

  .showAllLink {
    text-decoration: none;
    font-size: 0.8rem;
    margin-top: 1.4rem;
    color: #292929;
    letter-spacing: 1px;
    width: 5rem;
    line-height: -20px;
    text-transform: uppercase;

    &:hover {
      border-bottom: 2px solid #292929;
    }
  }
`;
