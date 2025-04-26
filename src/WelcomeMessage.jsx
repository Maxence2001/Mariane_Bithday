import React from 'react';
import Confetti from 'react-confetti';

const WelcomeMessage = ({ isLoggedIn }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {isLoggedIn && (
        <>
          <h1>Joyeux anniversaire !</h1>
          <Confetti />
        </>
      )}
    </div>
  );
};

export default WelcomeMessage;
