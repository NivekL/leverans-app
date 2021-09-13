import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function LoginSignUp({ isLoggedIn, setIsLoggedIn }) {
  const [toggleLogIn, setToggleLogIn] = useState(true);

  return (
    <>
      {toggleLogIn ? (
        <div>
          <h3>logga in</h3>
          <Login toggleLogIn={toggleLogIn} setToggleLogIn={setToggleLogIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      ) : (
        <div>
          <h3>registrera dig</h3>
          <SignUp toggleLogIn={toggleLogIn} setToggleLogIn={setToggleLogIn} />
        </div>
      )}
    </>
  );
}

export default LoginSignUp;
