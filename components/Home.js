import { useState } from 'react'
import { ConnectionModal } from './ConnectionModal'

import { useState, useEffect } from 'react'
import { login } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

function Home() {
  const [isSignUp, setIsSignup] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false)

  return (
    <div className='home-container'>
      {isSignUp && <ConnectionModal setIsSignup={setIsSignup} setIsSignIn={setIsSignIn} connectionType='signup' />}
      {isSignIn && <ConnectionModal setIsSignup={setIsSignup} setIsSignIn={setIsSignIn} connectionType='signin' />}
      <div className='image'></div>

      <main className='main'>
        <div className='logo'>
          <img src="/icons/twitter.png" alt="twitter icon" className="twitter-icon"/>
        </div>
          <h1>See what's happening</h1>
        <div className='signup'>
          <p>Join hackatweet today</p>
          <button type='submit' className="button signup-button" onClick={() => setIsSignup(!isSignUp)}>
            Sign up
          </button>
        </div>
        <div className='signin'>
          <p>Already have an account</p>
          <button type='submit' className="button signin-button" onClick={() => setIsSignIn(!isSignUp)}>
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;

